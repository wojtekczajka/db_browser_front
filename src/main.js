import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { createApp } from "vue";
import axios from 'axios';

import App from './App.vue';
import router from './router';
import store from './store';

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token;  // this code of block prevent user logout - after refresh
}

const app = createApp(App);

axios.defaults.withCredentials = false;
axios.defaults.baseURL = 'http://127.0.0.1:8000';  // the FastAPI backend
axios.interceptors.request.use(function (config) {
  // change the url scheme from http to https
  // config.url = config.url.replace('http://', 'https://')
  return config
})

app.use(router);
app.use(store);
if (token) {
  localStorage.setItem("user-token", token);
}
app.mount("#app");