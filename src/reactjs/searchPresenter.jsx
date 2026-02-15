import { observer } from "mobx-react-lite";
import { SearchFormView } from "../views/searchFormView.jsx";
import { SearchResultsView } from "../views/searchResultsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

export const Search = observer(function Search(props){

    const promiseState = props.model.searchResultsPromiseState || {};

    return (
        <>
            <SearchFormView />
            {
                promiseState.data
                    ? <SearchResultsView />
                    : <SuspenseView />
            }
        </>
    );
});
