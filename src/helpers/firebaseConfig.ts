import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTLJ2LVRUN_6KPhs88DVtFGzVVuSQ-SEQ",
  authDomain: "newsapiappms.firebaseapp.com",
  projectId: "newsapiappms",
  storageBucket: "newsapiappms.appspot.com",
  messagingSenderId: "188576490883",
  appId: "1:188576490883:web:b3ca8896c07420756002b6",
  measurementId: "G-DBC22TRX38"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);
// export const ref = ref(app);