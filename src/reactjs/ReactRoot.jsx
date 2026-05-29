import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Summary } from "./summaryPresenter.jsx";
import { SuspenseView } from "/src/views/suspenseView";
import { observer } from "mobx-react-lite";
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";

const ReactRoot = observer(function ReactRoot(props){
    // Show SuspenseView while model is not ready (loading from persistence)
    if (!props.model.ready) {
        return <SuspenseView promise={true} />;
    }
    
    // Create router with routes
    const router = createHashRouter([
        {
            path: "/",
            element: <Search model={props.model} />
        },
        {
            path: "/search",
            element: <Search model={props.model} />
        },
        {
            path: "/details",
            element: <Details model={props.model} />
        },
        {
            path: "/summary",
            element: <Summary model={props.model} />
        }
    ]);
    
    return (<div className="flexParent">
                <div className="sidebar"><Sidebar model={props.model} /></div>
                <div className="mainContent">
                    <RouterProvider router={router} />
                </div>
            </div>
           );
});

export { ReactRoot }
