import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBm9wJWcFSOmCZXYtqLWZvPg_YJlfOmTtk",
  authDomain: "hd-frontend-task.firebaseapp.com",
  projectId: "hd-frontend-task",
  storageBucket: "hd-frontend-task.appspot.com",
  messagingSenderId: "535771740316",
  appId: "1:535771740316:web:4cb010739aff7132f45559",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
