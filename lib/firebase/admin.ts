import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";

let app: App;
let adminAuth: Auth;

if (!getApps().length) {
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
} else {
  app = getApps()[0];
}

adminAuth = getAuth(app);

export { adminAuth };
