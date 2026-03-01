export function SearchResultsView(props) {
    // For user feedback: highlight dishes already in menu
    const menuDishIds = Array.isArray(props.menuDishIds) ? props.menuDishIds : [];
    return (
        <div>
            {props.searchResults.map(function renderSearchResultCB(dish) {
                const isInMenu = menuDishIds.includes(dish.id);
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
                        className={isInMenu ? "dishCard selectedDish" : "dishCard"}
                        style={{
                            display: "inline-block",
                            width: "200px",
                            margin: "10px",
                            textAlign: "center",
                            verticalAlign: "top",
                            cursor: "pointer"
                        }}
                        tabIndex={0}
                        role="button"
                        aria-pressed={isInMenu}
                        title={isInMenu ? "Already in menu" : "Click to view details"}
                    >
                        <img
                            src={dish.image}
                            height={100}
                            alt={dish.title}
                        />
                        <div>{dish.title}</div>
                        <div className="dishCardMeta">
                            {isInMenu ? "Already in menu" : "Open details"}
                        </div>
                    </span>
                );
            })}
        </div>
    );
}