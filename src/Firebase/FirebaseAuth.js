import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Firebase.config";

export const initAuthentication = () => initializeApp(firebaseConfig);
