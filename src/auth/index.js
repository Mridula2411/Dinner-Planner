import { initializeApp } from "firebase/app";
import {firebaseConfig} from "./firebaseConfig.js";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, signOut} from "firebase/auth";


const app= initializeApp(firebaseConfig);
const auth = getAuth(app);

const appDiv = document.getElementById('app');
appDiv.innerHTML= auth.currentUser;  // should be undefined

// To enable authentication in your firebase project, go to "all products", choose Authentication,
/// then add a provider, choose the Google provider, enable it with its tickbox
// documentation: https://firebase.google.com/docs/auth/web/google-signin
// look for other providers!
const provider = new GoogleAuthProvider();

// demo "sign in/out" UI, just a fixed button for now.
document.getElementById("authButton")
   .addEventListener("click", function clickACB(){
        auth.currentUser? signOut(auth) : 
        signInWithPopup(auth, provider)
   });

// Your events from the authentication! 
// Set this up in connectToFirebase, where you have access to the model
// replace readFromFirebase: we need to check if we have a user first!
onAuthStateChanged(auth, loginOrOutACB);

function loginOrOutACB(user){
  // demo render:
  appDiv.innerHTML="user "+(user?" ID "+user.uid:user);

  // model.user= user
  // model.ready=false
  // readFromFirebase
}


// read from persistence: 
// -----------------
// do nothing if model.user falsy (maybe wipe the model data)
// otherwise read from a document whose name includes model.user.uid
// manage model.ready as usual

// save to persistence: 
// -----------------
// do nothing if model.user falsy
// otherwise write to the document as above, 
// depending on model.ready as usual

// UI: 
// - model.user undefined: show suspense because firebase auth not initialized yet
// - model.user null: shouw "sign in" UI (a button/link that triggers signInWithPopup, see below)
// - model.user truthy: should the App (based on model.ready!) with the "sign out" UI







