import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";

export function createUserEmailAndPassword(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        resolve(userCredential);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export function logOut() {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export function updateUserProfile(details) {
  return new Promise((resolve, reject) => {
    updateProfile(auth.currentUser, details)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export function sendVerification() {
  return new Promise((resolve, reject) => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export function sendPasswordReset(email) {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(email)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}

export function newPassword(password) {
  return new Promise((resolve, reject) => {
    updatePassword(password)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
}
