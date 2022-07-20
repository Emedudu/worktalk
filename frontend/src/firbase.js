// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { login, register } from "./_requests";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCag1v5rBfWZsDqUwc71gtBbgW5bNHmOlw",
  authDomain: "worktalk-ccb22.firebaseapp.com",
  projectId: "worktalk-ccb22",
  storageBucket: "worktalk-ccb22.appspot.com",
  messagingSenderId: "201417650044",
  appId: "1:201417650044:web:86b25b470b4f520b77fef9",
  measurementId: "G-PGTPFCRY2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export const signUp=async(email,password,name,location)=>{
    try {
        let userCredential=await createUserWithEmailAndPassword(auth, email, password)
        userCredential=userCredential.user
        const res=await register(name,userCredential.uid,location)
        return res.data
    } catch (error) {
        throw error
    }
}
export const signIn=async(email,password,token)=>{
    try {
        let userCredential=await signInWithEmailAndPassword(auth, email, password)
        userCredential=userCredential.user
        const res=await login(userCredential.uid,token)
        return res.data
    } catch (error) {
        throw error
    }
}
