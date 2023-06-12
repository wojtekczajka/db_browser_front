<template>
  <div class="main">
    <Navbar />
    
    <div v-if="!isAuthenticated">
      <AuthView /> 
      <!-- can it be separate route /auth for app  -->
    </div>
    <div v-else>
      <!-- Your main content here -->
    </div>
  </div>
</template>

<script>
import AuthView from "@/views/AuthView.vue";

export default {
  name: "MainView",
  components: {
    AuthView
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  // Rest of your code
};
</script>
