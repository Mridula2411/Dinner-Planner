import { observer } from "mobx-react-lite";
import { SearchFormView } from "../views/searchFormView.jsx";
import { SearchResultsView } from "../views/searchResultsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

export const Search = observer(function Search(props){

    const model = props.model;
    const promiseState = model.searchResultsPromiseState || {};

    return (
        <>
            <SearchFormView
                dishTypeOptions={["starter", "main course", "dessert"]}
                text={model.searchParams.query || ""}
                type={model.searchParams.type || ""}
            />

            {
                promiseState.data
                ? (
                    <SearchResultsView
                        searchResults={promiseState.data}
                    />
                  )
                : (
                    <SuspenseView
                        promise={promiseState.promise}
                        error={promiseState.error}
                    />
                  )
            }
        </>
    );
});