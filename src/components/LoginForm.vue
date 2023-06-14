<template>
  <div>
    <form class="text-dark" @submit.prevent="handleLogin">
      <div class="mb-3">
        <label for="inputLogin" class="form-label">Login</label>
        <input type="text" class="form-control" required v-model="form.username">
      </div>
      <div class="mb-3">
        <label for="inputPassword" class="form-label">Password</label>
        <input type="password" class="form-control" required v-model="form.password">
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary border w-100">Submit</button>
      </div>
    </form>
    <div class="text-center text-dark mt-3">
      <form @submit.prevent="handleGoogleLogin">
        <p>or log in with:</p>
        <button type="submit" class="btn btn-floating btn-secondary mx-1 w-100">
          <i class="fab fa-google"></i> Google
        </button>
      </form>
    </div>
    <div class="login-form-content mt-3">
      <p class="text-danger" v-if="loginError">Error logging in. Please try again.</p>
      <p class="text-success" v-if="activationSuccess">Account activated successfully. Please log in.</p>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import { AUTH_REQUEST } from "../store/actions/auth";
import { AUTH_SUCCESS } from "../store/actions/auth";
import { USER_REQUEST } from "../store/actions/user";

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      loginSuccess: false,
      loginError: false,
      activationSuccess: false
    };
  },
  methods: {
    handleLogin() {
      const { username, password } = this.form;
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      console.log(formData);
      this.$store.dispatch(AUTH_REQUEST, formData)
        .then(() => {
          this.loginSuccess = true;
          setTimeout(() => {
            this.$router.push("/");
          }, 1000);
          this.$router.push("/");
        })
        .catch((error) => {
          this.loginError = true;
          console.log(error);
        });
    },
    handleGoogleLogin() {
      window.location.href = axios.defaults.baseURL + "/auth/google_signin/";
    },
    checkAccessToken() {
      const accessToken = this.$route.query.access_token;
      if (accessToken) {
        this.$store.commit(AUTH_REQUEST);
        this.$store.commit(AUTH_SUCCESS, accessToken);
        axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
        localStorage.setItem("user-token", accessToken);
        this.$store.dispatch(USER_REQUEST)
          .then(() => {
            this.loginSuccess = true;
            this.$router.push("/");
          })
          .catch((error) => {
            this.loginError = true;
            console.log(error);
          });
      }
    },
    checkActivationSuccess() {
      const activationSuccess = this.$route.query.activation_success;
      if (activationSuccess) {
        this.activationSuccess = true;
      }
    }
  },
  mounted() {
    this.checkAccessToken();
    this.checkActivationSuccess();
  }
};
</script>