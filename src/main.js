import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import router from "./router";

const app = createApp(App);
app.use(router); // This line is crucial
app.mount("#app");
