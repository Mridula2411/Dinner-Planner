import { observer } from "mobx-react-lite";
import { DetailsView } from "../views/detailsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

export const Details = observer(function Details(props){

    const model = props.model;
    const promiseState = model.currentDishPromiseState || {};

    function addDishToMenuACB() {
        model.addToMenu(promiseState.data);
    }

    if(promiseState.data){
        const isDishInMenu = model.dishes.find(function findDishCB(dish) {
            return dish.id === promiseState.data.id;
        }) !== undefined;

        return (
            <DetailsView
                dishData={promiseState.data}
                guests={model.numberOfGuests}
                isDishInMenu={isDishInMenu}
                onAddToMenu={addDishToMenuACB}
            />
        );
    }

    return (
        <SuspenseView
            promise={promiseState.promise}
            error={promiseState.error}
        />
    );
});
