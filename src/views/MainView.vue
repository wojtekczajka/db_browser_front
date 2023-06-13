<template>
  <div class="main">
    <Navbar />

    <div v-if="!isAuthenticated">
      <AuthView />
      <!-- Separate route or component for authentication -->
    </div>
    <div v-else class="text-dark">
      <div v-if="databaseInfo" class="d-flex align-items-center justify-content-center w-100 vh-100">
        <div class="text-center">
          <h2>Database Name: {{ databaseInfo.db_name }}</h2>
          <div class="list-group">
            <li class="list-group-item list-group-item-action active">Table List</li>
            <li class="list-group-item list-group-item-action" v-for="table in databaseInfo.db_tables" :key="table">
              {{ table }}
            </li>
          </div>
          <router-link to="/browse" class="btn btn-secondary w-100 mt-3">Browse Data</router-link>
        </div>
      </div>
      <div v-else>
        <p>Loading database information...</p>
      </div>
      <!-- Your main content here -->
    </div>
  </div>
</template>

<script>
import AuthView from "@/views/AuthView.vue";
import axios from "axios";

export default {
  name: "MainView",
  components: {
    AuthView,
  },
  data() {
    return {
      databaseInfo: null,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  created() {
    this.fetchDatabaseInfo();
  },
  methods: {
    fetchDatabaseInfo() {
      axios
        .get("/database-info/")
        .then((response) => {
          this.databaseInfo = response.data;
        })
        .catch((error) => {
          console.error("Error fetching database information:", error);
        });
    },
  },
};
</script>
