import Stripe from 'stripe';
import 'dotenv/config';
import User from '../models/User.js';
import { handler, HttpError } from '../utils/http.js';
const stripe=process.env.STRIPE_SECRET_KEY?new Stripe(process.env.STRIPE_SECRET_KEY):null;
const prices=()=>({pro:process.env.STRIPE_PRO_PRICE_ID,team:process.env.STRIPE_TEAM_PRICE_ID});
export const createCheckoutSession=handler(async(req,res)=>{
 const plan=req.body.plan;
 if(!['pro','team'].includes(plan))throw new HttpError(400,'Invalid plan');
 if(!stripe||!prices()[plan]||!process.env.FRONTEND_URL)throw new HttpError(503,'Billing has not been configured');
 const session=await stripe.checkout.sessions.create({mode:'subscription',line_items:[{price:prices()[plan],quantity:1}],
 customer_email:req.user.stripeCustomerId?undefined:req.user.email,customer:req.user.stripeCustomerId||undefined,
 client_reference_id:String(req.user._id),metadata:{plan},subscription_data:{metadata:{plan,userId:String(req.user._id)}},
 success_url:process.env.FRONTEND_URL+'/billing?success=true',cancel_url:process.env.FRONTEND_URL+'/billing?canceled=true'});
 res.json({url:session.url});
});
export const webhook=handler(async(req,res)=>{
 if(!stripe||!process.env.STRIPE_WEBHOOK_SECRET)throw new HttpError(503,'Billing webhook has not been configured');
 let event;try{event=stripe.webhooks.constructEvent(req.body,req.headers['stripe-signature'],process.env.STRIPE_WEBHOOK_SECRET);}catch{throw new HttpError(400,'Invalid webhook signature');}
 if(event.type==='checkout.session.completed'){
  const checkout=event.data.object;
  if(checkout.mode==='subscription' && checkout.subscription && checkout.client_reference_id){
    const subscription=await stripe.subscriptions.retrieve(checkout.subscription);
    const price=subscription.items.data[0]?.price?.id;
    const plan=Object.entries(prices()).find(([,id])=>id===price)?.[0];
    if(plan)await User.findByIdAndUpdate(checkout.client_reference_id,{$set:{stripeCustomerId:checkout.customer,subscriptionPlan:['active','trialing'].includes(subscription.status)?plan:'free',subscriptionStatus:subscription.status}},{runValidators:true});
  }
 }
 if(['customer.subscription.updated','customer.subscription.deleted'].includes(event.type)){
  const subscription=event.data.object;
  // Retrieve the current state so delayed/out-of-order events cannot restore old entitlements.
  const current=await stripe.subscriptions.retrieve(subscription.id);
  const plan=Object.entries(prices()).find(([,id])=>id===current.items.data[0]?.price?.id)?.[0]||'free';
  await User.findOneAndUpdate({stripeCustomerId:current.customer},{$set:{subscriptionStatus:current.status,subscriptionPlan:['active','trialing'].includes(current.status)?plan:'free'}},{runValidators:true});
 }
 res.json({received:true});
});

export const getPlans=handler(async(req,res)=>{
 const plans=[];
 for(const [plan,priceId]of Object.entries(prices())){
  if(!stripe||!priceId){plans.push({plan,available:false});continue;}
  const price=await stripe.prices.retrieve(priceId);
  plans.push({plan,available:price.active,amount:price.unit_amount,currency:price.currency,interval:price.recurring?.interval});
 }
 res.json({plans});
});
