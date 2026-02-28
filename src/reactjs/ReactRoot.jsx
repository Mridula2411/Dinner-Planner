import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Summary } from "./summaryPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { observer } from "mobx-react-lite";

const ReactRoot = observer(function ReactRoot(props){
    // Show SuspenseView while model is not ready (loading from persistence)
    if (!props.model.ready) {
        return <SuspenseView promise={true} />;
    }
    
    return (<div className="flexParent">
                <div className="sidebar"><Sidebar model={props.model} /></div>
                <div className="mainContent">
                    <Summary model={props.model} />
                    <Search model={props.model}/>
                    <Details model={props.model}/>
                </div>
            </div>
           );
});

export { ReactRoot }
