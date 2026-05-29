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

    function onScrollACB(evt) {
        const container = evt.target;
        const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100;
        
        if (isNearBottom && promiseState.data && !model.loadMorePromiseState.promise) {
            model.loadMoreResults();
        }
    }

    const allResults = promiseState.data ? [
        ...promiseState.data,
        ...(model.loadMorePromiseState && model.loadMorePromiseState.data ? model.loadMorePromiseState.data : [])
    ] : [];

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

            <div
                onScroll={onScrollACB}
                style={{
                    overflowY: "auto",
                    height: "500px"
                }}
            >
                {
                    allResults.length > 0
                    ? (
                        <SearchResultsView
                            searchResults={allResults}
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
            </div>
        </>
    );
});;