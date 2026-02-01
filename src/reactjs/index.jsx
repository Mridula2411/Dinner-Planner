import {createElement, Fragment} from "react";
import { reactiveModel } from "/src/mobxReactiveModel.js";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
import { dishesConst } from "/src/dishesConst.js";

window.React= {createElement:createElement, Fragment:Fragment}; // needed in the lab because it works with both React and Vue

import { createRoot } from "react-dom/client";
reactiveModel.addToMenu(dishesConst[0]);
reactiveModel.addToMenu(dishesConst[2]);
reactiveModel.addToMenu(dishesConst[5]);

// mount the app in the browser page. Test at http://localhost:8080/react.html
createRoot(document.getElementById('root')).render(<ReactRoot model={reactiveModel} />
);
