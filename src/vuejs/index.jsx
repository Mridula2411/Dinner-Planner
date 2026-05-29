import { createApp, h } from "vue";
import { VueRoot } from "/src/vuejs/VueRoot";
import { reactiveModel } from "/src/vueReactiveModel";

window.React = {createElement: h};  // needed in the lab because it works with both React and Vue

// mount the app in the browser page. Test at http://localhost:8080/vue.html
const app = createApp(function render() {
    return window.React.createElement(VueRoot, { model: reactiveModel });
});
app.mount('#root');


