import { searchDishes, getDishDetails } from "/src/dishSource";
import { resolvePromise } from "/src/resolvePromise";

/* 
   The Model keeps the state of the application (Application State).
   It is an abstract object, i.e. it knows nothing about graphics and interaction.
*/

export const model = {  
    numberOfGuests: 2,
    dishes: [],
    currentDishId: null,   // null means intentionally empty

    searchParams: {},
    searchOffset: 0,
    searchResultsPromiseState: {},
    currentDishPromiseState: {},
    loadMorePromiseState: {},

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
        function shouldWeKeepDishCB(dish){
            
            return dish.id !== dishToRemove.id;
        }
        this.dishes = this.dishes.filter(shouldWeKeepDishCB);
    },

    setSearchQuery(query){
        this.searchParams.query = query;
        this.scheduleSearch();
    },

    setSearchType(type){
        this.searchParams.type = type;
        this.scheduleSearch();
    },

    scheduleSearch(){
        if (this._searchTimer) {
            clearTimeout(this._searchTimer);
        }

        const self = this;
        this._searchTimer = setTimeout(function scheduleSearchTimeoutACB() {
            const paramsWithPagination = {...self.searchParams, offset: 0, number: 10};
            self.doSearch(paramsWithPagination);
            self._searchTimer = null;
        }, 1000);
    },

    doSearch(params){
        if (this._searchTimer) {
            clearTimeout(this._searchTimer);
            this._searchTimer = null;
        }

        this.searchOffset = 0;
        resolvePromise(
            searchDishes(params),
            this.searchResultsPromiseState
        );
    },

    loadMoreResults(){
        if (!this.searchResultsPromiseState.data) return;
        
        this.searchOffset += 10;
        resolvePromise(
            searchDishes({...this.searchParams, offset: this.searchOffset, number: 10}),
            this.loadMorePromiseState
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
