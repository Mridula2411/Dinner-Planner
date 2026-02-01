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
            <button
                disabled={props.number === 1}
                onClick={onMinusACB}
            >
                -
            </button>

            {props.number}

            <button onClick={onPlusACB}>+</button>

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
    }
    return (
        <tr key={dish.id}>
            <td>
                <button onClick={onRemoveDishACB}>X</button>
            </td>
            <td>
                <a href="#" onClick={onDishLinkACB}>{dish.title}</a>
            </td>
            <td>{dishType(dish)}</td>
            <td className="Quantity">
                {(dish.pricePerServing * props.number).toFixed(2)}
            </td>
        </tr>
    );
}
}