import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
  } from "firebase/auth";
// import { auth } from "../../../config/firebase"
import auth from "../../../config/firebase";

export const createAccount = async (email: string, password: string) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
    }
};

export const monitorAuthChange = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            return true;
        } else {
            return false;
        }
    });
};