export function SearchResultsView(props) {
    return (
        <div>
            {props.searchResults.map(function renderSearchResultCB(dish) {
                function onDishClickACB() {
                    if (props.onDishClick) {
                        props.onDishClick(dish);
                    }
                    window.location.hash = "#/details";
                }

                return (
                    <span
                        key={dish.id}
                        onClick={onDishClickACB}
                        style={{
                            display: "inline-block",
                            width: "200px",
                            margin: "10px",
                            textAlign: "center",
                            verticalAlign: "top",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src={dish.image}
                            height={100}
                            alt={dish.title}
                        />
                        <div>{dish.title}</div>
                    </span>
                );
            })}
        </div>
    );
}