import "/src/teacherFetch.js"; // protection against fetch() in infinite loops
import { observable, configure, reaction } from "mobx";
import{model} from "/src/DinnerModel.js";
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

// ------ for Lab debug purposes ----------
// making the reactive model available at the browser JavasScript Console
window.myModel= reactiveModel;

// making some example dishes available 
import {dishesConst} from "/src/dishesConst.js";
window.dishesConst= dishesConst;

//myModel.addToMenu(dishesConst[2]); //You can test with more/different dishes