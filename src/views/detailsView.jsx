export function DetailsView(props) {
    const dish = props.dishData;
    const pricePerPerson = dish.pricePerServing || 0;
    const priceForAllGuests = pricePerPerson * props.guests;

    function onAddToMenuACB() {
        if (props.onAddToMenu) {
            props.onAddToMenu();
        }
    }

    return (
        <div>
            <h2>{dish.title}</h2>

            <img
                src={dish.image}
                alt={dish.title}
                height={300}
            />

            <div>
                <p>
                    <strong>Price per serving:</strong> ${pricePerPerson.toFixed(2)}
                </p>
                <p>
                    <strong>Price for {props.guests} guests:</strong> ${priceForAllGuests.toFixed(2)}
                </p>
            </div>

            <div>
                <h3>Ingredients</h3>
                <ul>
                    {dish.extendedIngredients && dish.extendedIngredients.map(function renderIngredientCB(ingredient) {
                        return (
                            <li key={ingredient.id} data-key={ingredient.id}>
                                {ingredient.name}: {ingredient.amount} {ingredient.unit}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div>
                <h3>Instructions</h3>
                <p>{dish.instructions || "No instructions available."}</p>
            </div>

            <div>
                <a
                    href={dish.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Recipe
                </a>
            </div>

            <div>
                <button
                    disabled={props.isDishInMenu}
                    onClick={onAddToMenuACB}
                >
                    Add to menu
                </button>
                <button>
                    Cancel
                </button>
            </div>
        </div>
    );
}
