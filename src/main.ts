import { createApp } from "vue";
import "./styles/global.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Logger from "./utils/logger";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount("#app");

try {
  const mod = await import("./bootstrap/restoreAuth");
  if (mod && typeof mod.restoreAuth === "function") {
    try {
      await mod.restoreAuth();
    } catch (e: any) {
      Logger.error(`Error during restoreAuth execution: ${e.toString()}`);
    }
  }
} catch (e: any) {
  Logger.error(`Failed to load restoreAuth module: ${e.toString()}`);
}
