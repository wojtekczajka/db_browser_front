<template>
    <div class="nav-bar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
            <div class="container">
                <a class="navbar-brand px-2" href="#">Authorization using JWT tokens</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link class="nav-item nav-link" to="/" exact>Home</router-link>
                        <router-link v-if="isProfileLoaded" class="nav-item nav-link" to="/profile">{{ name }}</router-link>
                        <router-link class="nav-item nav-link" to="/resources">Resources</router-link>
                        <a v-if="isAuthenticated" @click="logout" class="nav-item nav-link" href="#">Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
  
<script>
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "../store/actions/auth";

export default {
    name: "NavBar",
    methods: {
        logout: function () {
            this.$store.dispatch(AUTH_LOGOUT).then(() => this.$router.push("/"));
        },
    },
    computed: {
        ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
        ...mapState({
            authLoading: (state) => state.auth.status === "loading",
            name: (state) => `${state.user.profile.username}`,
        }),
    },
};
</script>