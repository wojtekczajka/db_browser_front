<template>
    <div>
        <form class="text-dark" @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="inputEmail" class="form-label">E-mail</label>
                <input type="email" class="form-control" required v-model="email">
            </div>
            <div class="mb-3">
                <label for="inputLogin" class="form-label">Login</label>
                <input type="text" class="form-control" required v-model="username">
            </div>
            <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input type="password" class="form-control" required v-model="password">
            </div>
            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary border w-100">Submit</button>
            </div>
        </form>
        <div class="text-center text-dark mt-3">
            <form @submit.prevent="handleGoogleLogin">
                <p>or log in with:</p>
                <input type="submit" class="btn btn-secondary w-100" value="Continue with Google">
            </form>
        </div>
        <div class="login-form-content mt-3">
            <p class="text-danger" v-if="registerError">Error signing up. Please try again.</p>
            <p class="text-success" v-if="registerSuccess">Successfully signed up! To complete the registration, activate your account via mail</p>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import { AUTH_REQUEST } from "../store/actions/auth";
import { AUTH_SUCCESS } from "../store/actions/auth";
import { USER_REQUEST } from "../store/actions/user";

export default {
    name: "RegisterForm",
    data() {
        return {
            email: "",
            username: "",
            password: "",
            registerError: false,
            registerSuccess: false
        };
    },
    methods: {
        handleSubmit() {
            axios.post("/auth/signup/", {
                email: this.email,
                username: this.username,
                password: this.password
            })
                .then(() => {
                        this.registerSuccess = true;  
                })
                .catch(error => {
                    console.log(error);
                    this.registerError = true;
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
                this.$store.dispatch(USER_REQUEST)
                    .then(() => {
                        alert("You have been successfully logged in :)");
                        this.$router.push("/");
                    })
                    .catch((error) => {
                        alert("Error logging in. Please try again.");
                        console.log(error);
                    });
            }
        }
    },
    mounted() {
        this.checkAccessToken();
    }
};
</script>
  
<style>
/* Add any custom styles here */
</style>
  