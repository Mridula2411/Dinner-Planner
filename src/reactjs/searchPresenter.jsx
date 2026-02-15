import { observer } from "mobx-react-lite";
import { SearchFormView } from "../views/searchFormView.jsx";
import { SearchResultsView } from "../views/searchResultsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

export const Search = observer(function Search(props){

    const model = props.model;
    const promiseState = model.searchResultsPromiseState || {};

    function onTextChangeACB(text) {
        model.setSearchQuery(text);
    }

    function onTypeChangeACB(type) {
        model.setSearchType(type);
    }

    function onDoSearchACB() {
        model.doSearch(model.searchParams);
    }

    function onDishClickACB(dish) {
        model.setCurrentDishId(dish.id);
    }

    return (
        <>
            <SearchFormView
                dishTypeOptions={["starter", "main course", "dessert"]}
                text={model.searchParams.query || ""}
                type={model.searchParams.type || ""}
                onTextChange={onTextChangeACB}
                onTypeChange={onTypeChangeACB}
                onDoSearch={onDoSearchACB}
            />

            {
                promiseState.data
                ? (
                    <SearchResultsView
                        searchResults={promiseState.data}
                        onDishClick={onDishClickACB}
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