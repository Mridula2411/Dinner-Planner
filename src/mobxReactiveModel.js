import "/src/teacherFetch.js"; // protection against fetch() in infinite loops
import { observable, configure, reaction } from "mobx";
import{model} from "/src/DinnerModel";
import {connectToPersistence} from "/src/firestoreModel";
configure({ enforceActions: "never", });  // we don't use Mobx actions in the Lab

export const reactiveModel=observable(model);

reaction(
    function currentDishIdACB() {
        return reactiveModel.currentDishId;
    },
    function currentDishEffectACB() {
        reactiveModel.currentDishEffect();
    }
);

reactiveModel.doSearch({});

// Connect to Firebase Firestore persistence
connectToPersistence(reactiveModel, reaction);

// ------ for Lab debug purposes ----------
// making the reactive model available at the browser JavasScript Console
window.myModel= reactiveModel;

// making some example dishes available 
import {dishesConst} from "/src/dishesConst";
window.dishesConst= dishesConst;

//myModel.addToMenu(dishesConst[2]); //You can test with more/different dishes