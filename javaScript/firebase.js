import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyDK1Oh9-Yfl2BrJ59PsECDL0Q_ywn9jHU0",
  authDomain: "bookstoner-79bcd.firebaseapp.com",
  projectId: "bookstoner-79bcd",
  storageBucket: "bookstoner-79bcd.appspot.com",
  messagingSenderId: "334060629153",
  appId: "1:334060629153:web:8289f621618f029ade94e0",
  measurementId: "G-V1C94EX8HD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);