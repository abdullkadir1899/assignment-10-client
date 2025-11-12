import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCCCKA6XCwmmctl66yJxzpzmWXWEvlCDFI",
  authDomain: "assignment-10-client-44dc7.firebaseapp.com",
  projectId: "assignment-10-client-44dc7",
  storageBucket: "assignment-10-client-44dc7.firebasestorage.app",
  messagingSenderId: "306809051339",
  appId: "1:306809051339:web:8151561693b3a646dde34e"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


export default app;