import { dishType, menuPrice, sortDishes } from "../utilities.js";
import "/src/style.css";

export function SidebarView(props){

    function onMinusACB(){
        props.onNumberChange(props.number - 1);
    }

    function onPlusACB(){
        props.onNumberChange(props.number + 1);
    }

    return (
        <div>
            <div className="guestControls">
                <strong>Guests</strong>
                <div>
                    <button
                        className="secondaryButton"
                        disabled={props.number === 1}
                        onClick={onMinusACB}
                        aria-label="Decrease number of guests"
                    >
                        -
                    </button>
                    <span className="guestCount"> {props.number} </span>
                    <button className="secondaryButton" onClick={onPlusACB} aria-label="Increase number of guests">+</button>
                </div>
                <small>Use + and - to change servings for all dishes.</small>
            </div>
            <table>
                <tbody>
                    {sortDishes([...props.dishes]).map(dishTableRowCB)}
                    <tr>
                        <td></td>
                        <td>Total:</td>
                        <td></td>
                        <td className="Quantity">
                            {(menuPrice(props.dishes) * props.number).toFixed(2)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

   function dishTableRowCB(dish){
    function onRemoveDishACB() {
        if(props.onRemoveDish) {
            props.onRemoveDish(dish);
        }
    }
    function onDishLinkACB(evt) {
        evt.preventDefault();
        if(props.onDishLink) {
            props.onDishLink(dish);
        }
        window.location.hash = "#/details";
    }
    return (
        <tr key={dish.id} data-key={dish.id}>
            <td>
                <button className="dangerButton" onClick={onRemoveDishACB} title="Remove from menu">x</button>
            </td>
            <td>
                <a href="#" onClick={onDishLinkACB} className="dishLink">{dish.title}</a>
            </td>
            <td>{dishType(dish)}</td>
            <td className="Quantity">
                {(dish.pricePerServing * props.number).toFixed(2)}
            </td>
        </tr>
    );
}
}