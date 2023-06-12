<template>
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center" style="height: 100vh;">
        <transition name="fade" :duration="{ enter: 1000, leave: 1000 }" mode="out-in">
          <div class="col-md-4 col-sm-8 col-10 border p-4 bg-light" :key="showRegisterForm">
            <transition name="fade">
              <template v-if="!showRegisterForm">
                <LoginForm @login-success="handleLoginSuccess" />
              </template>
              <template v-else>
                <RegisterForm @register-success="handleRegisterSuccess" />
              </template>
            </transition>
            <div class="text-center text-dark mt-3">
              <p v-if="!showRegisterForm">
                Don't have an account?
                <a href="#" @click.prevent="toggleRegisterForm">Register</a>
              </p>
              <p v-else>
                Already have an account?
                <a href="#" @click.prevent="toggleRegisterForm">Login</a>
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  import LoginForm from "@/components/LoginForm.vue";
  import RegisterForm from "@/components/RegisterForm.vue";
  
  export default {
    name: "AuthView",
    components: {
      LoginForm,
      RegisterForm
    },
    data() {
      return {
        showRegisterForm: false
      };
    },
    methods: {
      handleLoginSuccess() {
        alert("You have been successfully logged in :)");
        this.$router.push("/");
      },
      handleRegisterSuccess() {
        alert("Successfully signed up!");
        this.showRegisterForm = false;
      },
      toggleRegisterForm() {
        this.showRegisterForm = !this.showRegisterForm;
      },
    }
  };
  </script>
  
  <style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  