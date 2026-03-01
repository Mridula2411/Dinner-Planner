export function SearchFormView(props) {

    function onTextChangeACB(evt){
        props.onTextChange && props.onTextChange(evt.target.value);
    }

    function onTypeChangeACB(evt){
        props.onTypeChange && props.onTypeChange(evt.target.value);
    }

    function onSearchACB(){
        props.onDoSearch && props.onDoSearch();
    }
    
    function onSummaryACB(){
        window.location.hash = "#/summary";
    }

    return (
        <div>
            <p className="firstUseHint">
                Welcome! Start by searching for a dish name (e.g. "pasta"), then optionally filter by course type. Click a result to see details and add it to your menu.
            </p>

            <label htmlFor="dishNameInput">
                Dish name
            </label>
            <input
                id="dishNameInput"
                value={props.text || ""}
                onChange={onTextChangeACB}
                placeholder="e.g. pasta, soup, chocolate"
            />

            <label htmlFor="courseTypeSelect">
                Course type
            </label>
            <select
                id="courseTypeSelect"
                value={props.type || ""}
                onChange={onTypeChangeACB}
            >
                <option value="">Choose:</option>
                {props.dishTypeOptions.map(function renderDishTypeOptionCB(optionString) {
                    return (
                        <option
                            key={optionString}
                            value={optionString}
                        >
                            {optionString}
                        </option>
                    );
                })}
            </select>

            <button className="primaryButton" onClick={onSearchACB}>
                Search dishes
            </button>
            <button className="secondaryButton" onClick={onSummaryACB}>
                Summary
            </button>
        </div>
    );
}