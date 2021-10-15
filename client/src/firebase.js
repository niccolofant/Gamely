import { initializeApp } from "@firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDs0I7U941x1j7UZaLLorOxTWpGrfRs5os",
  authDomain: "gamely-d5d01.firebaseapp.com",
  databaseURL:
    "https://gamely-d5d01-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gamely-d5d01",
  storageBucket: "gamely-d5d01.appspot.com",
  messagingSenderId: "55899963598",
  appId: "1:55899963598:web:4096b8a228d3025d2d109f",
  measurementId: "G-DJW7SXFF2X",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database;
