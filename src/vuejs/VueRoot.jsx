import { Summary } from "./summaryPresenter.jsx";

function VueRoot(props){
    return window.React.createElement(
        "div",
        null,
        window.React.createElement(
            "div",
            null,
            window.React.createElement(Summary, { model: props.model })
        )
    );
}

export { VueRoot }

