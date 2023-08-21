<template>
  <div style="padding-bottom: 200px">



    <button v-if="this.showHamburger" class="hamburger-button" @click="toggleSidebar">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="navbarContainer" v-if="windowWidth >= mobileBreakpoint">
      <!-- Your existing navigation bar code here -->
      <AppNavbar> </AppNavbar>

    </div>


    <div   class="mobile-sidebar"
  :class="{open: isOpen, closed: !isOpen}" v-else>
      <!-- Hamburger button -->

      <!-- Mobile sidebar -->
      <MobileSidebar v-show="isSidebarOpen" />
    </div>
















    <h3 style="margin-top: 80px; margin-bottom: 25px">
      Détails spécifiques de l'inventaire
    </h3>
    <button
      class="import-button"
      @click="fetchSpeceficInventaire"
      v-if="this.afficherButtonToggle == 0"
    >
      Afficher
    </button>

    <div
      class="TableDetailsContainer"
      v-if="SpecificInventoryArticles.length > 0"
    >
      <div class="Pdf_Csv_ButtonsWrapper">
        <div class="Pdf_Csv_ButtonsContainer">
          <div>
            <!-- Bouton export to pdf  -->
            <button @click="exportToPDF" class="normalButton pdfExportButton">
              Export to PDF
            </button>
          </div>

          <div>
            <button @click="exportToSCV" class="normalButton CSVExportButton">
              Export to CSV
            </button>
          </div>
        </div>
      </div>
       <div class="InventoryBasicDetails">
              <div class="inventory-item"></div>
              <div class="inventory-item">
                <strong>Nom Inventaire:</strong>
                {{ this.nomInventaire }}
              </div>
              <div class="inventory-item">
                <strong>Date de creation:</strong>
                {{ this.dateCreationInventaire }}
              </div>
            </div>
      <div class="DataTableWrapper">
        <div class="DataTableContainer">
          <div ref="myElement" class="DataTableContainer">
     
            <div class="ConteneurTable">
              <table id="myTable" class="data-table">
                <thead>
                  <tr>
                    <th>Ordre</th>

                    <th>Reference</th>
                    <th>Designation</th>
                    <th>lot</th>
                    <th>Date de Fabrication</th>
                    <th>Date de Peremption</th>
                    <th>Emplacement</th>
                    <th>Quantite1</th>
                    <th>Createur1</th>
                    <th>Quantite2</th>
                    <th>Createur2</th>
                    <th>quantite3</th>
                    <th>Createur3</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(row, index) in SpecificInventoryArticles"
                    :key="index"
                  >
                    <td>{{ index+1 }}</td>

                    <td>{{ row.reference }}</td>
                    <td>{{ row.designation }}</td>
                    <td>{{ row.lot }}</td>
                    <td>{{ row.dateFabrication }}</td>
                    <td>{{ row.datePeremption }}</td>
                    <td>{{ row.Emplacement }}</td>
                    <td>
                      <input
                        :id="'input-' + row.id + '-1'"
                        style="width: 50px"
                        type="number"
                        min="0"
                        :value="row.quantite1"
                        disabled="true"
                        class="lnormalInputStyle"
                      />
                    </td>

    <td>{{ row.createur1 || 'Admin' }}</td>

                    <td>
                      <input
                        :id="'input-' + row.id + '-2'"
                        style="width: 50px"
                        type="number"
                        min="0"
                        :value="row.quantite2"
                        disabled="true"
                        class="lwrongInputStyle"
                      />
                    </td>
                    <td>{{ row.createur2 || 'Admin'}}</td>

                    <td>
                      <input
                        :id="'input-' + row.id + '-3'"
                        style="width: 50px"
                        type="number"
                        min="0"
                        :value="row.quantite3"
                        disabled="true"
                        class="lnormalInputStyle"
                      />
                    </td>
                    <td>{{ row.createur3 || 'Admin'}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

import { HTTP } from "/axios";

import AppNavbar from "../components/AppNavbar.vue";
import MobileSidebar from "../components/SideBarMobile.vue";

export default {
  components: {
    AppNavbar,
                MobileSidebar,

  },
  
    computed: {
      sidebarState() {
    return this.isSidebarOpen ? 'open' : 'closed';
  },
    formattedDate() {
      return this.formatDate(this.momentObj);
      
    },
  },
  data() {
    return {
                  mobileBreakpoint: 768,
      windowWidth: window.innerWidth,
      isSidebarOpen: false,
      SpecificInventoryArticles: 0,
      reloadTest: 0,
      afficherButtonToggle: 0,
    };
  },
  async mounted() {
        this.handleResize(); 

  },
  created() {
        this.handleResize(); 

    if (!localStorage.getItem("isReloaded")) {
      localStorage.setItem("isReloaded", "true");

      location.reload();
    } else {
      localStorage.removeItem("isReloaded");
    }
  },

  methods: {
            handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= this.mobileBreakpoint) {
        this.isSidebarOpen = false; 
        this.showHamburger=false;
      }
      else{
                this.showHamburger=true;

      }
    },
toggleSidebar() {
        this.isOpen = !this.isOpen;

  if (this.isSidebarOpen) {
    this.isSidebarOpen = false;

  } else {
    this.isSidebarOpen = true; 
  }

},
  watch: {
    windowWidth(newValue) {
      if (newValue >= this.mobileBreakpoint) {
        this.isSidebarOpen = false;
      }
    },
  },
exportToSCV() {
  const table = document.querySelector("#myTable");
  const rows = [];

  for (const row of table.rows) {
    const rowData = [];

    for (const cell of row.cells) {
      if (cell.querySelector('input')) {
        rowData.push(cell.querySelector('input').value); // Get value from input field if exists
      } else {
        rowData.push(cell.textContent);
      }
    }

    rows.push(rowData.join(";"));
  }

  const csvContent = rows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);

  link.download = "table.csv";

  link.click();

  URL.revokeObjectURL(link.href);
},

    exportToPDF() {
      const element = this.$refs.myElement;

      html2pdf()
        .set({
          margin: [3, 0.1, 0.1, 0.1], // top, right, bottom, left margins
          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 3, logging: true },
          jsPDF: { unit: "cm", format: "A3", orientation: "Landscape" },
        })
        .from(element)
        .save();
    },

    async fetchSpeceficInventaire() {
      const url = window.location.pathname;
      const inventoryId = url.substring(url.lastIndexOf("/") + 1);

      const responseSpeceficInvent = await HTTP.get(
        `Inventaires_non_verifiesAPI/getSpeceficInventory/${inventoryId}`
      );

      console.log("console.log(responseSpeceficInvent)");

      const dataresponse = responseSpeceficInvent.data[0];

      console.log(dataresponse);

      this.dateCreationInventaire = dataresponse.DateInsertion_DB;
      this.nomInventaire = dataresponse.nomInventaire;

      this.afficherButtonToggle = 1;
      try {
        let url = window.location.pathname;
        let LienArticleInventaire = url.substring(url.lastIndexOf("/") + 1);

        const response = await HTTP.get(
          `ArticlesAPI/allArticlesByLienArticleInventaire/${LienArticleInventaire}`
        );
        console.log(response.data);
        this.SpecificInventoryArticles = response.data;
        console.log("Les données de l'inventaire cliqué   ");
        console.log(this.SpecificInventory);

        console.log(
          "longueur du tableau de données est " +
            this.SpecificInventoryArticles.length
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>


.hamburger-button {
  position: relative;
  z-index: 100;
    display: block;
  padding: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
.mobile-sidebar.open {
  transform: translateX(0);  
}

.mobile-sidebar.closed {
  transform: translateX(-100%);
}
.mobile-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 99;
  background-color: #d1d1d1;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  transition: transform 0.3s ease; 
}
.hamburger-button span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 4px auto;
}






@media (max-width: 768px) {
  .PageTitle {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .import-button {
    font-size: 14px;
  }

  .Pdf_Csv_ButtonsContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .Pdf_Csv_ButtonsContainer div {
    margin-bottom: 10px;
  }

  .DataTableContainer {
    width: 100%;
    padding: 10px;
  }

  .data-table th,
  .data-table td {
    padding: 5px;
  }

  .InventoryBasicDetails {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
justify-content: center;
padding-left:50px ;
}

  .inventory-item {
    margin-bottom: 5px;
  }

  .DataTableWrapper {
    width: 90%;
        overflow-x:auto !important ;

  }
  .myTable{
        width: 90%;
  }
}







.normalButton {
  padding: 10px 20px;
  margin: 10px;
  transition: opacity 0.5s;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  font-size: 14px;
}

.TableDetailsContainer {
}

.Pdf_Csv_ButtonsWrapper {
  display: flex;
  justify-content: center;
}

.Pdf_Csv_ButtonsContainer {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin-bottom: 40px;
}

h1 {
  color: gray;
  text-align: center;
}

.inventory-item {
  margin-bottom: 10px;
}

.DataTableContainer {
  justify-content: center;
}

.DataTableWrapper {
  display: flex;
  justify-content: center;
}
.DataTableContainer {
  width: 90%;
  margin-top: 30px;
  margin: auto;
}

.InventoryBasicDetails {
  padding-bottom: 20px;
}

.pdfExportButton {
  background: rgb(211, 55, 55);
}

.pdfExportButton:hover {
  background: rgb(212, 89, 89);
}

.CSVExportButton {
  background: rgb(34, 151, 28);
}

.CSVExportButton:hover {
  background: rgb(56, 176, 49);
}
.ImportButtonContainer {
  padding-top: 30px;
  padding-bottom: 30px;
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

.data-table th,
.data-table td {
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
