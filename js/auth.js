// js/auth.js
import { signInWithPopup, GithubAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebase/9.24.1/firebase-auth.js";

// GitHub login
const provider = new GithubAuthProvider();
export function login() {
  signInWithPopup(auth, provider)
    .then(result => {
      console.log("Logged in as:", result.user.displayName);
    })
    .catch(error => console.error("Login error:", error));
}

// Logout
export function logout() {
  signOut(auth).catch(error => console.error("Logout error:", error));
}

// Auth state listener
export function onAuthChange(callback) {
  onAuthStateChanged(auth, user => {
    callback(user);
  });
}