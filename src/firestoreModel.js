// initialize Firebase app
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

import { firebaseConfig } from "/src/firebaseConfig.js";

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

const app = hasFirebaseConfig ? (getApps().length ? getApps()[0] : initializeApp(firebaseConfig)) : null;
const db = app ? getFirestore(app) : null;
window.db = db;

// make doc and setDoc available at the Console for testing
window.doc = doc;
window.setDoc = setDoc;

/* Replace NN with your TW2_TW3 group number! */
const COLLECTION = "dinnerModelNN";
const DOCUMENT_NAME = "modelData";

export function connectToPersistence(model, watchFunction) {
    console.log("connectToPersistence called");

    model.ready = true;

    if (!db) {
        console.log("Firebase not configured; persistence is disabled.");
        model.numberOfGuests = model.numberOfGuests ?? 2;
        model.dishes = model.dishes ?? [];
        model.currentDishId = model.currentDishId ?? null;
        return;
    }

    // Set model.ready to false to prevent writing while reading (avoid race conditions)
    model.ready = false;

    // Create document reference once to reuse for both reading and writing
    const firestoreDoc = doc(db, COLLECTION, DOCUMENT_NAME);

    // Flag to track when we're updating from Firestore to avoid triggering saves
    let isUpdatingFromFirestore = false;

    // Set up a side effect that persists the model whenever important properties change
    watchFunction(
        function trackModelChangesACB() {
            return [model.numberOfGuests, model.dishes, model.currentDishId];
        },
        function saveModelToFirestoreACB() {
            console.log("Save triggered, model.ready:", model.ready, "isUpdatingFromFirestore:", isUpdatingFromFirestore);
            if (!model.ready || isUpdatingFromFirestore) return;

            console.log("Saving to Firestore:", {
                numberOfGuests: model.numberOfGuests,
                dishes: model.dishes,
                currentDishId: model.currentDishId
            });

            const result = setDoc(firestoreDoc, {
                numberOfGuests: model.numberOfGuests,
                dishes: model.dishes,
                currentDishId: model.currentDishId
            }, { merge: true });
            if (result && result.catch) {
                result.catch(console.error);
            }
        }
    );

    getDoc(firestoreDoc)
        .then(function getDocACB(docSnapshot) {
            console.log("Reading from Firestore, document exists:", docSnapshot.exists);
            if (docSnapshot.exists) {
                const data = docSnapshot.data();
                console.log("Data from Firestore:", data);
                if (data) {
                    model.numberOfGuests = data.numberOfGuests ?? 2;
                    model.dishes = data.dishes ?? [];
                    model.currentDishId = data.currentDishId ?? null;
                } else {
                    model.numberOfGuests = 2;
                    model.dishes = [];
                    model.currentDishId = null;
                }
            } else {
                console.log("No document found in Firestore, using defaults");
                model.numberOfGuests = 2;
                model.dishes = [];
                model.currentDishId = null;
            }
            console.log("Setting model.ready to true");
            model.ready = true;

            onSnapshot(firestoreDoc, function onFirestoreUpdateACB(docSnapshot) {
                if (!docSnapshot.exists) {
                    console.log("Document deleted in Firestore");
                    return;
                }

                const data = docSnapshot.data();
                console.log("Real-time update from Firestore:", data);

                isUpdatingFromFirestore = true;

                if (data) {
                    model.numberOfGuests = data.numberOfGuests ?? model.numberOfGuests;
                    model.dishes = data.dishes ?? model.dishes;
                    model.currentDishId = data.currentDishId ?? model.currentDishId;
                }

                isUpdatingFromFirestore = false;
                console.log("Real-time update applied to model");
            }, function onErrorACB(error) {
                console.error("Error in real-time listener:", error);
            });
        })
        .catch(function getDocErrorACB(error) {
            console.error("Error reading from Firestore:", error);
            model.numberOfGuests = 2;
            model.dishes = [];
            model.currentDishId = null;
            model.ready = true;
        });
}




