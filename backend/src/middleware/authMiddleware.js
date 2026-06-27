import "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/User.js";

export const verifyTokenOnly = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      req.firebaseUser = await getAuth().verifyIdToken(token);
      
      if (!req.firebaseUser.email_verified) {
        return res.status(403).json({ message: "Please verify your email address to access the API" });
      }
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify Firebase ID token
      const decodedToken = await getAuth().verifyIdToken(token);

      if (!decodedToken.email_verified) {
        return res.status(403).json({ message: "Please verify your email address to access the API" });
      }

      // Find user in MongoDB using firebaseUid or email
      req.user = await User.findOne({ 
        $or: [
          { firebaseUid: decodedToken.uid },
          { email: decodedToken.email }
        ]
      });

      if (!req.user) {
        return res.status(401).json({ message: "User not found in database" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
