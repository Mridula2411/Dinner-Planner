// initialize Firebase app
import { initializeApp } from "firebase/app";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore";

// uncomment the following lines when you have your firebaseConfig. Understand what the lines are doing!
import {firebaseConfig} from "/src/firebaseConfig.js";
const app= initializeApp(firebaseConfig);
const db= getFirestore(app);
window.db= db

// make doc and setDoc available at the Console for testing
window.doc= doc        
window.setDoc= setDoc


/* Replace NN with your TW2_TW3 group number! */
const COLLECTION="dinnerModelNN";
const DOCUMENT_NAME="modelData";

// TODO: read the code above
// TODO: export the function connectToPersistence, it can be empty for starters

export function connectToPersistence(model, watchFunction) {
    console.log("connectToPersistence called");
    // Set model.ready to false to prevent writing while reading (avoid race conditions)
    model.ready = false;
    
    // Create document reference once to reuse for both reading and writing
    const firestoreDoc = doc(db, COLLECTION, DOCUMENT_NAME);
    
    // Set up a side effect that persists the model whenever important properties change
    watchFunction(
        function trackModelChangesACB() {
            // Return array of properties to watch: numberOfGuests, dishes, currentDishId
            return [model.numberOfGuests, model.dishes, model.currentDishId];
        },
        function saveModelToFirestoreACB() {
            console.log("Save triggered, model.ready:", model.ready);
            // Only save if model.ready is true to avoid infinite loops during model initialization
            if (!model.ready) return;
            
            console.log("Saving to Firestore:", {
                numberOfGuests: model.numberOfGuests,
                dishes: model.dishes,
                currentDishId: model.currentDishId
            });
            
            // Save the model to Firestore when the tracked properties change
            const result = setDoc(firestoreDoc, {
                numberOfGuests: model.numberOfGuests,
                dishes: model.dishes,
                currentDishId: model.currentDishId
            }, {merge: true});
            if (result && result.catch) {
                result.catch(console.error);
            }
        }
    );
    
    // Read the model from Firestore persistence (happens once when app starts)
    getDoc(firestoreDoc)
        .then(function getDocACB(docSnapshot) {
            console.log("Reading from Firestore, document exists:", docSnapshot.exists);
            if (docSnapshot.exists) {
                const data = docSnapshot.data();
                console.log("Data from Firestore:", data);
                if (data) {
                    // Set the model properties from persisted data, with defaults for missing values
                    model.numberOfGuests = data.numberOfGuests ?? 2;
                    model.dishes = data.dishes ?? [];
                    model.currentDishId = data.currentDishId ?? null;
                } else {
                    // Document exists but data is null/undefined, set defaults
                    model.numberOfGuests = 2;
                    model.dishes = [];
                    model.currentDishId = null;
                }
            } else {
                console.log("No document found in Firestore, using defaults");
                // No document exists in cloud, set defaults
                model.numberOfGuests = 2;
                model.dishes = [];
                model.currentDishId = null;
            }
            // Set model.ready to true as the last thing (model is now ready for normal operation)
            console.log("Setting model.ready to true");
            model.ready = true;
        })
        .catch(function getDocErrorACB(error) {
            console.error("Error reading from Firestore:", error);
            // Even on error, set defaults and ready to true so the app can work
            model.numberOfGuests = 2;
            model.dishes = [];
            model.currentDishId = null;
            model.ready = true;
        });
}












