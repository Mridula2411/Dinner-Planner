export function SidebarView(props){
    return (
       <div>
            <button disabled={props.number === 1}>-</button>
            {props.number}
            <button>+</button>
        </div>
    );
}
