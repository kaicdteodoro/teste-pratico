import money from 'v-money';
import router from "./router.js";
import vuetify from "./vuetify.js";

export function usePlugins(app) {
    app.use(router);
    app.use(vuetify);
    app.use(money, {precision: 4});
}
