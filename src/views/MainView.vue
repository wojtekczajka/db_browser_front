<template>
  <div class="main">
    <Navbar />

    <div v-if="!isAuthenticated">
      <AuthView />
      <!-- Separate route or component for authentication -->
    </div>
    <div v-else class="text-dark">
      <div v-if="databaseInfo" class="row justify-content-center mt-5">
        <div class="col-md-8">
          <h2 class="text-center text-dark">Database Name: {{ databaseInfo.db_name }}</h2>
          <ul class="list-group">
            <li class="list-group-item list-group-item-action active">Table List</li>
            <li class="list-group-item list-group-item-action" v-for="table in databaseInfo.db_tables" :key="table" @click="redirectToBrowse(table)">
              {{ table }}
            </li>
          </ul>
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
    if (this.isAuthenticated) {
      this.fetchDatabaseInfo();
    }
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
    redirectToBrowse(table) {
      this.$router.push({
        path: "/browse",
        query: { table },
      });
    },
  },
};
</script>
