import { SummaryView } from "/src/views/summaryView";
import { shoppingList } from "/src/utilities";

export function Summary(props){
    return window.React.createElement(SummaryView, {
        people: props.model.numberOfGuests,
        ingredients: shoppingList(props.model.dishes),
    });
}

