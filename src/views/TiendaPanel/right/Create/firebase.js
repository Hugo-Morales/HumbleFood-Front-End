import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBLuZ-Fxh4QOKGQ9KmyRGhzhR3RgloTw3s",
    authDomain: "upload-imagen-proyect.firebaseapp.com",
    projectId: "upload-imagen-proyect",
    storageBucket: "upload-imagen-proyect.appspot.com",
    messagingSenderId: "781623842600",
    appId: "1:781623842600:web:0d0f3bf24ae937fafaa21d"
  };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage();