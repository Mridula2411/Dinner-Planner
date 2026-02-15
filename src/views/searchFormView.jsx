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

    return (
        <div>
            <input
                value={props.text || ""}
                onChange={onTextChangeACB}
            />

            <select
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

            <button onClick={onSearchACB}>
                Search!
            </button>
        </div>
    );
}