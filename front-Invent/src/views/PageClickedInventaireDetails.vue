<template>
  <div style="padding-bottom: 200px">
    <AppNavbar></AppNavbar>

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

      <div class="DataTableWrapper">
        <div class="DataTableContainer">
          <div ref="myElement" class="DataTableContainer">
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

                    <td>{{ row.createur1 }}</td>

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
                    <td>{{ row.createur2 }}</td>

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
                    <td>{{ row.createur3 }}</td>
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

export default {
  components: {
    AppNavbar,
  },
  data() {
    return {
      SpecificInventoryArticles: 0,
      reloadTest: 0,
      afficherButtonToggle: 0,
    };
  },
  async mounted() {},
  created() {
    if (!localStorage.getItem("isReloaded")) {
      localStorage.setItem("isReloaded", "true");

      location.reload();
    } else {
      localStorage.removeItem("isReloaded");
    }
  },

  methods: {
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
