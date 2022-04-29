import { createApp } from "vue";
import App from "./App.vue";

import * as math from "mathjs"

const mathjsPlugin = {
  install(app) {
    app.config.globalProperties.$math = math;
  },
};

let app = createApp(App);
app.use(mathjsPlugin);

app.mount("#app");
