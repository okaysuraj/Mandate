import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import 'dotenv/config';
if (!getApps().length && process.env.NODE_ENV !== 'test') {
  const credential = process.env.FIREBASE_PRIVATE_KEY ? cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }) : applicationDefault();
  initializeApp({ credential, projectId: process.env.FIREBASE_PROJECT_ID });
}
