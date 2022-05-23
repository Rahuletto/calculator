import { createApp } from "vue";
import App from "./App.vue";

import * as math from 'mathjs'

import './registerServiceWorker'

const mathPlugin = {
  install(app) {
    app.config.globalProperties.$math = math;
  },
};

let app = createApp(App);
app.use(mathPlugin)

app.mount("#app");