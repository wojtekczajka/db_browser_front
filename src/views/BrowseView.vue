<template>
  <div class="container">
    <div v-if="databaseInfo && imageLoaded" class="row justify-content-center mt-5">
      <div class="col-md-8">
        <h2 class="text-center text-dark">Database Name: {{ databaseInfo.db_name }}</h2>
        <img :src="diagramUrl" alt="Database Diagram" class="img-fluid" />
        <ul class="list-group">
          <li class="list-group-item list-group-item-action active">Table List</li>
          <li class="list-group-item list-group-item-action" v-for="table in databaseInfo.db_tables" :key="table" @click="executeTableQuery(table)">
            {{ table }}
          </li>
        </ul>
      </div>
    </div>

    <div v-else class="text-dark">
      <p>Loading database information...</p>
    </div>

    <div v-if="queryResult" class="row justify-content-center mt-5">
      <div class="col-md-12 text-dark">
        <h3 class="text-center text-secondary">{{ sqlQuery }}</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col" v-for="(value, key) in queryResult[0]" :key="key">
                <button class="btn" @click="sortTable(key)">{{ key }}</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in filteredQueryResult" :key="index">
              <td v-for="(value, key) in row" :key="key">{{ value }}</td>
            </tr>
          </tbody>
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
        <input type="text" class="form-control" v-model="filterCondition" placeholder="Filter condition" />
      </div>
    </div>

    <div class="row justify-content-center mt-3">
      <div class="col-md-8">
        <input type="text" class="form-control" v-model="sqlQuery" placeholder="SQL query" />
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
      filterCondition: "",
      sortColumn: "",
      sortAscending: true,
      diagramUrl: "",
      imageLoaded: false,
    };
  },
  computed: {
    filteredQueryResult() {
      if (!this.queryResult) return [];
      if (!this.filterCondition) return this.queryResult;

      return this.queryResult.filter((row) => {
        for (const value of Object.values(row)) {
          if (String(value).includes(this.filterCondition)) {
            return true;
          }
        }
        return false;
      });
    },
  },
  created() {
    this.fetchDatabaseInfo();
    this.executeQuery();
    this.fetchDiagram();
  },
  methods: {
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
    executeQuery() {
      const table = this.$route.query.table;
      if (table) {
        axios
          .post("/execute_sql/", null, {
            params: {
              sql_query: `SELECT * FROM ${table}`,
            },
          })
          .then((response) => {
            if (Array.isArray(response.data)) {
              this.queryResult = response.data;
            }
          })
          .catch((error) => {
            console.error("Error executing SQL query:", error);
          })
          .finally(() => {
          this.$router.replace({ query: {} }); // Reset the query parameter to empty
        });
      }
    },
    executeTableQuery(table) {
      const query = `SELECT * FROM ${table}`;
      this.sqlQuery = query;
      this.sendQuery();
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
    fetchDiagram() {
      axios
        .get("/database-diagram/", { responseType: "arraybuffer" })
        .then((response) => {
          const blob = new Blob([response.data], { type: "image/png" });
          this.diagramUrl = URL.createObjectURL(blob);
          this.imageLoaded = true;
        })
        .catch((error) => {
          console.error("Error fetching database diagram:", error);
        });
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortColumn = column;
        this.sortAscending = true;
      }

      this.queryResult.sort((a, b) => {
        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (valueA < valueB) {
          return this.sortAscending ? -1 : 1;
        } else if (valueA > valueB) {
          return this.sortAscending ? 1 : -1;
        } else {
          return 0;
        }
      });
    },
  },
};
</script>
