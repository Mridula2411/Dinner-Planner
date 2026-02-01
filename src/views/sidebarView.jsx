import {dishType, menuPrice, sortDishes} from "../utilities.js"
import "/src/style.css"

export function SidebarView(props){
    // return "SidebarView stub: number is "+props.number + " and we have "+props.dishes.length+ " dishes";
    return(
        <div>
            <button disabled={props.number===1}>-</button>{props.number}<button>+</button>

            <table>
                <tbody>
                    {sortDishes([...props.dishes]).map(dishTableRowCB)}
                    <tr>
                        <td></td>
                        <td>Total:</td>
                        <td></td>
                        <td className="Quantity">{(menuPrice(props.dishes)*props.number).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )

    function dishTableRowCB(dish){
        return(
            <tr key={dish.id}>
                <td><button>X</button></td>
                <td><a href="#">{dish.title}</a></td>
                <td>{dishType(dish)}</td>
                <td className="Quantity">{(dish.pricePerServing*props.number).toFixed(2)}</td>
            </tr>
        )
    }
}