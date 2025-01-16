
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCP9OE-kUea4oV4GpRos8VPc7J3mBpYmSA",
  authDomain: "app-crud-143c3.firebaseapp.com",
  databaseURL: "https://app-crud-143c3-default-rtdb.firebaseio.com",
  projectId: "app-crud-143c3",
  storageBucket: "app-crud-143c3.firebasestorage.app",
  messagingSenderId: "539289791439",
  appId: "1:539289791439:web:92c9c3c2ae90b3175f00ba"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)