import { observer } from "mobx-react-lite";
import { SidebarView } from "/src/views/sidebarView.jsx";

const Sidebar = observer(
    function SidebarRender(props) {
        return <SidebarView 
            number={props.model.numberOfGuests}
            dishes={props.model.dishes}
        />;
    }
);

export { Sidebar };