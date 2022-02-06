import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import header from "./Header.vue"
//import footer from "./Footer.vue"
import store from './store/store'
//import Nav from "./Nav.vue";


/*createApp(App).use(router).mount('#app')
createApp(header).use(router).mount("#header");
//createApp(Nav).use(router).mount("#nav");
createApp(footer).use(router).mount("#footer")
createApp(store).use(store).mount('#store')*/


const app = createApp(App);

app.use(router);
app.use(store);
app.mount('#app');