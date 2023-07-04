<template>


<div>
                <AppNavbar ></AppNavbar >

  <div class="container">

    <div style="margin-top:40px">
      <h3> Visualiser le contenu de votre fichier .CSV </h3>
    </div>
    <div class="ImportButtonContainer">
      <input type="file" ref="fileInput" @change="handleFileChange" accept=".csv" style="display: none">
      <button class="import-button" @click="openFileInput">Import</button>
    </div> 


    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Article</th>
          <th>Désignation</th>
          <th>Lot</th>
          <th>Date de Fabrication</th>
          <th>Date de Péremption</th>
          <th>Emplacements</th>
          <th>Nom de l'Emplacement</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in importedData" :key="index">
          <td>{{ row.id }}</td>
          <td>{{ row.Article }}</td>
          <td>{{ row.Designation }}</td>
          <td>{{ row.Lot }}</td>
          <td>{{ row.DateFabrication }}</td>
          <td>{{ row.Date_Premption }}</td>
          <td>{{ row.Emplacements }}</td>
          <td>{{ row.Nom_Emplacement }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>


<script>
import AppNavbar  from '../components/AppNavbar.vue';

export default {
     components: {
    AppNavbar
  },
  data() {
    return {
      importedData: [] 
    };
  },

    mounted(){
    document.title = 'Affichage Inventaire';


  },

  methods: {

    openFileInput() {
      this.$refs.fileInput.click();
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        this.importedData = this.parseCSV(contents);
      };
      reader.readAsText(file);
    },

    parseCSV(csv) {
      const rows = csv.split("\n");
      const headers = rows[0].split(";");
      const data = [];
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i].split(";");
        if (row.length === headers.length) {
          const rowData = {};
          for (let j = 0; j < headers.length; j++) {
            rowData[headers[j]] = row[j];
          }
          data.push(rowData);
        }
      }
      return data;
    },

    importData() {
      console.log("The imported Data ");
      console.log(this.importedData);
    }

  }
};
</script>


<style>
.ImportButtonContainer{
  padding-top:30px;
  padding-bottom:30px;

}
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.import-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.data-table tbody tr:hover {
  background-color: #e9e9e9;
}

</style>
