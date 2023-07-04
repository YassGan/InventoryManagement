<template>
  <div style="padding-bottom:200px">
                    <AppNavbar ></AppNavbar >

    <h1 style="padding-top:50px;padding-bottom:10px;">Détails spécifiques de l'inventaire</h1>

    <div v-if="SpecificInventory">
      
      <div class="Pdf_Csv_ButtonsWrapper">
          <div class="Pdf_Csv_ButtonsContainer">
            <div>
                <!-- Bouton export to pdf  -->
                    <button @click="exportToPDF" class="pdfExportButton">Export to PDF</button>
              </div>

              <div>
                <!-- Bouton export to pdf  -->
                    <button @click="exportToSCV" class="CSVExportButton">Export to CSV</button>
              </div>
          </div>
      </div>


 


    <div class="DataTableWrapper">
      <div ref="myElement" class="DataTableContainer">
            <div class="InventoryBasicDetails">
              <div class="inventory-item">
                <strong>ID:</strong> {{ SpecificInventory._id }}
              </div>
              <div class="inventory-item">
                <strong>Nom Inventaire:</strong> {{ SpecificInventory.NomInventaire }}
              </div>
              <div class="inventory-item">
                <strong>Date de création:</strong> {{ SpecificInventory.DateInsertion_DB }}
              </div>
            </div>
         <table id="myTable" class="data-table">
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
                <th>Quantité1</th>
                <th>Quantité2</th>
                <th>Quantité3</th>



                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, index) in SpecificInventory.TabArticles" :key="index">
                <td>{{ (index+1)}}</td>
                <td>{{ row.Article }}</td>
                <td>{{ row.Designation }}</td>
                <td>{{ row.Lot }}</td>
                <td>{{ row.DateFabrication }}</td>
                <td>{{ row.Date_Premption }}</td>
                <td>{{ row.Emplacements }}</td>
                <td>{{ row.Nom_Emplacement }}</td>
                <td>{{ row.Quantite1 }}</td>
                <td>{{ row.Quantite2 }}</td>
                <td>{{ row.Quantite3 }}</td>


                </tr>
            </tbody>
        </table>
      </div>
    </div>


    </div>


    
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js';

import { HTTP } from '/axios';

import AppNavbar from '../components/AppNavbar.vue';




export default {
       components: {
    AppNavbar
  },
  data() {
    return {
      AllInventories: [],
      SpecificInventory: null,
    };
  },
  created() {
    this.fetchInventories();
  },
  methods: {

    exportToSCV(){
       
        const table = document.querySelector('#myTable');

    const rows = [];

    for (const row of table.rows) {
      const rowData = [];

      for (const cell of row.cells) {
        rowData.push(cell.textContent);
      }

      rows.push(rowData.join(';'));
    }

    const csvContent = rows.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    link.download = 'table.csv';

    link.click();

    URL.revokeObjectURL(link.href);
    },


     exportToPDF() {
        const element = this.$refs.myElement; 

        html2pdf()
          .set({
            margin: 1,
            filename: 'document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, logging: true },
            jsPDF: { unit: 'in', format: 'A4', orientation: 'Landscape' }
          })
          .from(element)
          .save();
      },









      async fetchInventories() {
        try {
          //    const response = await axios.get('http://localhost:8000/getInventories', {

    const response = await HTTP.get('Inventaires/getInventories', {

      headers: {
         Email: localStorage.getItem("email"),
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    
    });   this.AllInventories = response.data;
          console.log('All the inventories:');
          console.log(this.AllInventories);

          const InventoryId = this.$route.params.InventId;
          this.SpecificInventory = this.AllInventories.find((p) => p._id === InventoryId);
          console.log('Specific Inventory:');
          console.log(this.SpecificInventory);
        } catch (error) {
          console.error(error);
        }
      },


  },
};
</script>

<style scoped>



.Pdf_Csv_ButtonsWrapper{
  display: flex;
  justify-content: center;
}



.Pdf_Csv_ButtonsContainer{
  display: flex;
  justify-content: space-between;
  width: 300px;
}



h1 {
  color: gray;
  text-align: center;
}

.inventory-item {
  margin-bottom: 10px;
}


.DataTableContainer{
    width: 900px;
    margin-top:30px;
}

.DataTableWrapper{
    display: flex;
    justify-content: center;
}

.InventoryBasicDetails{
  padding-bottom: 20px;
}

.pdfExportButton{
  background:rgb(211, 55, 55)
}

.pdfExportButton:hover{
  background:rgb(212, 89, 89)
}

.CSVExportButton{
    background:rgb(34, 151, 28)
}

.CSVExportButton:hover{
    background:rgb(56, 176, 49)
}

</style>
