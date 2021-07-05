import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// import { createApp, h } from 'vue'
// import App from './App.vue';


// const NotFoundComponent = { template: '<p>Page not found</p>' }
// const HomeComponent = { template: App }
// const LoginComponent = { template: '<p>Login</p>' }

// const routes = {
//   '/home': HomeComponent,
//   '/': LoginComponent
// }

// const SimpleRouter = {
//   data: () => ({
//     currentRoute: window.location.pathname
//   }),

//   computed: {
//     CurrentComponent() {
//       return routes[this.currentRoute] || NotFoundComponent
//     }
//   },

//   render() {
//     return h(this.CurrentComponent)
//   }
// }

// createApp(SimpleRouter).mount('#app')