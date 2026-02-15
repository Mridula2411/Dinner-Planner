import { observer } from "mobx-react-lite";
import { DetailsView } from "../views/detailsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

export const Details = observer(function Details(props){

    const promiseState = props.model.currentDishPromiseState || {};

    if(promiseState.data){
        return <DetailsView />;
    }

    return <SuspenseView />;
});
