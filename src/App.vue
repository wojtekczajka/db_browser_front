<template>
  <div id="app">
    <NavBar />
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <router-view />
    <!-- <FooTer /> -->
  </div>
</template>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  color: #fff;
  text-align: center;
}
</style>

<script>
import axios from 'axios';
import NavBar from './components/NavBar.vue';
// import FooTer from './components/FooTer.vue';
import { USER_REQUEST } from "./store/actions/user";
import { AUTH_LOGOUT } from "./store/actions/auth";

export default {
  components: {
    NavBar,
    // FooTer
  },
  name: 'MainView',
  created: function () {
    const self = this;

    const interceptorsPromise = new Promise(function (resolve, reject) {
      axios.interceptors.response.use(undefined, function (err) {
        if (err.response.status === 401 && !err.config.__isRetryRequest && err.response.data.detail === "Token expired") {
          self.$store.dispatch(AUTH_LOGOUT);
          console.log(err.response)
          alert("Access token expired. You will be automatically logged out.");
        }
        reject(err); // reject the Promise with the error
      });
    });

    interceptorsPromise.catch(function () {
      // handle errors from the interceptor Promise
    });

    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  },
}
</script>
