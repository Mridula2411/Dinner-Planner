// un-comment when needed:
import {sortIngredients} from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props){
    function onBackToSearchACB() {
        window.location.hash = "#/search";
    }
    
    return (
            <div className="summaryCard">
              <button className="secondaryButton summaryBackBtn" onClick={onBackToSearchACB}>Back to search</button>
              <div className="summaryTitle">
                Summary for <span title="nr guests">{props.people}</span>{props.people===1? " person" : " persons"}:
              </div>
              <table className="summaryTable">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {sortIngredients(props.ingredients).map(ingredientTableRowCB)}
                </tbody>
              </table>
            </div>
    );
    
    /* callback for Array Rendering in TW 1.3 */
    function ingredientTableRowCB(ingr){
        // console.log(ingr);
        return <tr key={ /* Reflect on what's a key in array rendering! */ ingr.id } >
                 <td>{ingr.name}</td>
                 <td>{ingr.aisle}</td>
                 <td className="Quantity">{(ingr.amount*props.people).toFixed(2)}</td>
                 <td>{ingr.unit}</td>
               </tr>;
    }
}