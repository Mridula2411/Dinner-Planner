import "/src/teacherFetch.js"; // protection against fetch() in infinite loops
import { reactive, watch } from "vue";
import { model } from "/src/DinnerModel";
import {connectToPersistence} from "/src/firestoreModel";

export const reactiveModel = reactive(model);

watch(
    function currentDishIdACB() {
        return reactiveModel.currentDishId;
    },
    function currentDishEffectACB() {
        reactiveModel.currentDishEffect();
    }
);

reactiveModel.doSearch({});

// Connect to Firebase Firestore persistence
connectToPersistence(reactiveModel, watch);

// making the reactive model available at the browser JavasScript Console
window.myModel = reactiveModel;

// making some example dishes available 
import {dishesConst} from "/src/dishesConst";
window.dishesConst= dishesConst;

//myModel.addToMenu(dishesConst[2]); //You can test with more/different dishes