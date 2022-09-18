import { initializeApp } from "firebase/app";
import * as dotenv from "dotenv";
dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "hd-frontend-task.firebaseapp.com",
  projectId: "hd-frontend-task",
  storageBucket: "hd-frontend-task.appspot.com",
  messagingSenderId: process.env.SENDER_ID,
  appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
