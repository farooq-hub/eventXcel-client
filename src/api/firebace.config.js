import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD5diQjKB9uLXAGFzm4WMmuz6oVgdQ_AV8",
  authDomain: "otpverify-6418e.firebaseapp.com",
  projectId: "otpverify-6418e",
  storageBucket: "otpverify-6418e.appspot.com",
  messagingSenderId: "251525895478",
  appId: "1:251525895478:web:8999d87ad6779787654f97",
  measurementId: "G-TZ5SJS5CHK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);