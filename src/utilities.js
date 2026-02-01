/* uncomment the export below to enable the 1.1.2 test suite! */
export function compareIngredientsCB(ingredientA, ingredientB){
  if (ingredientA.aisle < ingredientB.aisle){
    return -1
  }
  if (ingredientA.aisle > ingredientB.aisle){
    return 1
  }
  if (ingredientA.name < ingredientB.name){
    return -1
  }
  if (ingredientA.name > ingredientB.name){
    return 1
  }
  return 0
    
}

export function sortIngredients(ingredients){
    const copy = [...ingredients];
    return copy.sort(compareIngredientsCB);
}

export function isKnownTypeCB(type){
  return type === "starter" || type === "main course" || type === "dessert";
}

export function dishType(dish){
  if (!dish || !Array.isArray(dish.dishTypes)) {
    return "";
  } else {
    const found = dish.dishTypes.find(isKnownTypeCB);
    if (found) {
      return found;
    } else {
      return "";
    }
  }
}

export function compareDishesCB(dishA, dishB){
  const order = {
    "": 0,
    "starter": 1,
    "main course": 2,
    "dessert": 3
  };
  const typeA = dishType(dishA);
  const typeB = dishType(dishB);
  return order[typeA] - order[typeB];
}


export function sortDishes(dishes){
  const copy = Array.isArray(dishes) ? [...dishes] : [];
  return copy.sort(compareDishesCB);
}

export function sumReducerCB(resultSoFar, number){
  return resultSoFar + number;
}

export function dishPriceCB(dish){
  if (!dish) return 0;
  // prefer explicit numeric price fields, fall back to 0
  const p = dish.price ?? dish.pricePerServing ?? 0;
  return typeof p === "number" && !Number.isNaN(p) ? p : Number(p) || 0;
}

export function menuPrice(dishesArray){
  if (!Array.isArray(dishesArray)) return 0;
  // map each dish to its price, then sum using reduce with initial accumulator 0
  return dishesArray.map(dishPriceCB).reduce(sumReducerCB, 0);
}

/* 
  This function is already implemented as it is more JavaScript + algorithms than interaction programming

   Given a menu of dishes, generate a list of ingredients. 
   If an ingredient repeats in several dishes, it will be returned only once, with the amount added up 
   
   As this is not an algorithm course, the function is mostly written but you have 2 callback passing TODOs.
*/
export function shoppingList(dishes){
    const result = {};

    // we define the callback inside the function, though this is not strictly needed in this case. But see below.
    function keepJustIngredientsCB(dish){
        return dish.extendedIngredients;
    }
    
    // ingredientCB must be defined inside shopingList() because it needs access to `result`
    // you will often need to define a callback inside the function where it is used, so it has access to arguments and other variables
    function ingredientCB(ingredient){
        if(result[ingredient.id] === undefined){  // more general: !result[ingredient.id]
            // since result[ingredient.id] is not defined, it means that the ingredient is not taken into account yet
            // so we associate the ingredient with the ID
            result[ingredient.id]={...ingredient};
            
            // JS Notes about the line above:
            // 1)    result[ingredient.id] 
            // In JS object.property is the same as object["property"] but the second notation is more powerful because you can write
            // object[x]  where x=="property"
            
            // 2)    {...ingredient } creates a *copy* of the ingredient (object spread syntax)
            // we duplicate it because we will change the object below
        } else {
            // since result[ingredient.id] is not defined, it means that the ingredient has been encountered before.
            // so we add up the amount:
            result[ingredient.id].amount +=  ingredient.amount;
        }
    }

    const arrayOfIngredientArrays = Array.isArray(dishes)
        ? dishes.map(keepJustIngredientsCB)
        : [];

    const allIngredients = arrayOfIngredientArrays.flat();
    allIngredients.forEach(ingredientCB);

    // Note: the 3 lines above can be written as a function chain:
    // dishes.map(callback1).flat().forEach(callback2);

    // now we transform the result object into an array: we drop the keys and only keep the values
    return Object.values(result);
}