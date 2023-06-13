<template>
    <div class="container">

        <div v-if="databaseInfo" class="row justify-content-center mt-5">
            <div class="col-md-8">
                <h2 class="text-center text-dark">Database Name: {{ databaseInfo.db_name }}</h2>
                <ul class="list-group">
                    <li class="list-group-item list-group-item-action active">Table List</li>
                    <li class="list-group-item list-group-item-action" v-for="table in databaseInfo.db_tables" :key="table">
                        {{ table }}
                    </li>
                </ul>
            </div>
        </div>

        <div v-else class="text-dark">
            <p>Loading database information...</p>
        </div>

        <div v-if="queryResult" class="row justify-content-center mt-5">
            <div class="col-md-8 text-dark">
                <table class="table table-striped">
                    <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" v-for="(value, key) in queryResult[0]" :key="key">{{ key }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in queryResult" :key="index">
                        <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                    </tr>
                </tbody>
            </table>
                </table>
            </div>
        </div>

        <div v-if="errorMessage" class="row text-dark justify-content-center mt-5">
            <div class="col-md-8">
                <h1>Error</h1>
                <p>{{ errorMessage }}</p>
            </div>
        </div>

        <div class="row justify-content-center mt-3">
            <div class="col-md-8">
                <input type="text" class="form-control" v-model="sqlQuery" />
            </div>
        </div>
        <div class="row justify-content-center mt-3">
            <div class="col-md-8">
                <button @click="sendQuery" class="btn btn-primary">Send query</button>
            </div>
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
            axios
                .post("/execute_sql/", null, {
                    params: {
                        sql_query: this.sqlQuery,
                    },
                })
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        this.queryResult = response.data;
                        this.errorMessage = null;
                    } else {
                        this.queryResult = null;
                        this.errorMessage = response.data;
                    }
                })
                .catch((error) => {
                    console.error("Error executing SQL query:", error);
                    this.queryResult = null;
                    this.errorMessage = "An error occurred while executing the query.";
                });
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
  