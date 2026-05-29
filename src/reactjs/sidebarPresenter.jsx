import { observer } from "mobx-react-lite";
import { SidebarView } from "/src/views/sidebarView";

const Sidebar = observer(
    function SidebarRender(props) {
        function onNumberChangeACB(newNumber){
            props.model.setNumberOfGuests(newNumber);
        }

        function onRemoveDishACB(dish){
            props.model.removeFromMenu(dish);
        }

        function onDishInterestACB(dish){
    props.model.setCurrentDishId(dish.id);
        }
        return <SidebarView 
            number={props.model.numberOfGuests}
            dishes={props.model.dishes}
            onNumberChange={onNumberChangeACB}
            onRemoveDish={onRemoveDishACB}
            onDishLink={onDishInterestACB}
        />;
    }
);

export { Sidebar };