<template>
    <form class="text-dark" @submit.prevent="handleRegister">
        <div class="mb-3">
            <label for="inputEmail" class="form-label">E-mail</label>
            <input type="email" class="form-control bg-white" required v-model="email">
        </div>
        <div class="mb-3">
            <label for="inputLogin" class="form-label">Login</label>
            <input type="text" class="form-control" required v-model="username">
        </div>
        <div class="mb-3">
            <label for="inputPassword" class="form-label bg-white">Password</label>
            <input type="password" class="form-control bg-white" required v-model="password">
        </div>
        <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary border w-100">Submit</button>
        </div>
    </form>
    <div class="text-center text-dark mt-3">
        <p>or sign up with:</p>
        <button type="button" class="btn  btn-floating btn-secondary mx-1 w-100" @click="handleGoogleRegister">
            <i class="fab fa-google"></i> Google
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            username: "",
            password: ""
        };
    },
    methods: {
        handleRegister() {
            // Handle register logic
        }
    }
};
</script>
