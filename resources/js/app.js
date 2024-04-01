import './bootstrap';

import {createApp} from 'vue';
import App from './components/App.vue';
import {usePlugins} from "./plugins/index.js";


let app = createApp(App);
usePlugins(app);
app.mount("#app");
