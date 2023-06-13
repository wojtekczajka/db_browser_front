<template>
    <div class="text-dark">
        <div v-if="databaseInfo" class="d-flex align-items-center justify-content-center w-100 mt-5">
        <div class="text-center">
          <h2>Database Name: {{ databaseInfo.db_name }}</h2>
          <div class="list-group">
            <li class="list-group-item list-group-item-action active">Table List</li>
            <li class="list-group-item list-group-item-action" v-for="table in databaseInfo.db_tables" :key="table">
              {{ table }}
            </li>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Loading database information...</p>
      </div>

        <h1 class="mt-5">SQL Query</h1>
        <input type="text" v-model="sqlQuery" />
        <button @click="sendQuery">Wyślij zapytanie</button>

        <div v-if="queryResult">
            <h1>Query Result</h1>
            <p>{{ queryResult }}</p>
        </div>

        <div v-if="errorMessage">
            <h1>Error</h1>
            <p>{{ errorMessage }}</p>
        </div>

    </div>
</template>
  
<script>
import axios from "axios";
export default {
    name: "BrowseView",
    data() {
        return {
            sqlQuery: "",
            queryResult: null,
            errorMessage: null,
            databaseInfo: null,
        };
    },
    created() {
        this.fetchDatabaseInfo();
    },
    methods: {
        showTableContent() {
            // Implement logic to show table content for the selected table
            // Redirect to a new page displaying the table content
        },
        sendQuery() {
            // Implement logic to send the SQL query to the server and handle the response
            // Set the query result or error message based on the response
        },
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
  