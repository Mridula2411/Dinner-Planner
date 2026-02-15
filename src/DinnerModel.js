import { searchDishes, getDishDetails } from "/src/dishSource.js";
import { resolvePromise } from "/src/resolvePromise.js";

/* 
   The Model keeps the state of the application (Application State).
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/

export const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,   // null means intentionally empty

    searchParams: {},
    searchResultsPromiseState: {},
    currentDishPromiseState: {},

    setCurrentDishId(dishId){
        this.currentDishId = dishId;
    },
    
    setNumberOfGuests(number){
        const n = Number(number);
        if (!Number.isInteger(n) || n < 1) {
            throw new Error("number of guests not a positive integer");
        }
        this.numberOfGuests = n;
    },
    
    addToMenu(dishToAdd){
        this.dishes = [...this.dishes, dishToAdd];
    },

    removeFromMenu(dishToRemove){
        this.dishes = this.dishes.filter(function(dish){
            return dish.id !== dishToRemove.id;
        });
    },

    setSearchQuery(query){
        this.searchParams.query = query;
    },

    setSearchType(type){
        this.searchParams.type = type;
    },

    doSearch(params){
        resolvePromise(
            searchDishes(params),
            this.searchResultsPromiseState
        );
    },
    
    currentDishEffect(){
        if(!this.currentDishId){
            resolvePromise(
                undefined,
                this.currentDishPromiseState
            );
            return;
        }

        resolvePromise(
            getDishDetails(this.currentDishId),
            this.currentDishPromiseState
        );
    }
};
