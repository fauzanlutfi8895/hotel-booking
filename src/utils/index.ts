import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQ3VV5OazsMNOaqvumnhIwsB3b6z7J4PQ",
  authDomain: "hotel-booking-8a62f.firebaseapp.com",
  databaseURL: "https://hotel-booking-8a62f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotel-booking-8a62f",
  storageBucket: "hotel-booking-8a62f.firebasestorage.app",
  messagingSenderId: "959659222561",
  appId: "1:959659222561:web:7ac9b5b539273555d76560"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);