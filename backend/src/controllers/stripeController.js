import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock");

export const createCheckoutSession = async (req, res) => {
  try {
    const { plan } = req.body; // e.g. 'pro', 'team'
    
    // Hardcoded price IDs for demo purposes. 
    // In a real app, these should come from your environment or DB.
    let priceId = "";
    if (plan === "pro") priceId = process.env.STRIPE_PRO_PRICE_ID || "price_mock_pro";
    else if (plan === "team") priceId = process.env.STRIPE_TEAM_PRICE_ID || "price_mock_team";
    else return res.status(400).json({ message: "Invalid plan selected" });

    // Try to find the user's stripe customer id if they have one
    const user = await User.findById(req.user._id);
    let customerId = user.stripeCustomerId;

    if (!customerId && process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== "sk_test_mock") {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
      });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
      await user.save();
    }

    const sessionData = {
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/admin?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/admin?canceled=true`,
      client_reference_id: req.user._id.toString(),
    };

    if (customerId) {
      sessionData.customer = customerId;
    } else {
      sessionData.customer_email = user.email;
    }

    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== "sk_test_mock") {
      const session = await stripe.checkout.sessions.create(sessionData);
      res.status(200).json({ url: session.url });
    } else {
      // Mock flow if no keys
      console.log("MOCK STRIPE: Creating checkout session for", plan);
      // Automatically "upgrade" the user for demo purposes
      user.subscriptionPlan = plan;
      user.subscriptionStatus = "active";
      await user.save();
      res.status(200).json({ url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/admin?success=true` });
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== "sk_test_mock") {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } else {
      return res.status(200).send("Mock webhook acknowledged");
    }
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.client_reference_id;
        
        if (userId) {
          await User.findByIdAndUpdate(userId, {
            subscriptionStatus: "active",
            stripeCustomerId: session.customer,
            // You might want to map price ID to plan name here in a real app
            subscriptionPlan: "pro" 
          });
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;
        
        await User.findOneAndUpdate(
          { stripeCustomerId: customerId },
          { subscriptionStatus: subscription.status }
        );
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (error) {
    console.error("Error processing webhook event:", error);
    return res.status(500).send("Webhook handler failed");
  }

  res.status(200).send();
};
