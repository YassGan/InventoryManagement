<template>
  <div>





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

















    <div v-if="successfuleInventoryCreation == 0" class="container">
      <div style="margin-top: 40px">
        <h3>Vérifier le comptage du personnels</h3>
      </div>
      <div class="ImportButtonContainer">
        <button class="CasualButton NavyBlue" @click="getArticlesDynamically">
          Get articles
        </button>

        <button
          class="CasualButton red"
          v-if="importedData.length > 0"
          @click="VerificationComptage"
        >
          Submit
        </button>

        <h4
          style="color: black; padding-top: 20px"
          v-if="importedData.length == 0 && this.importButtonClick == 1"
        >
          Loading ...
        </h4>
      </div>

            <div class="tableMainContainer" >

      <div class="tableContainer" >
        <table class="data-table">
          <thead>
            <tr>
              <!-- <th>_iD</th> -->
              <th>Ordre</th>
              <th>Référence</th>
              <th>Désignation</th>

              <th>Emplacement</th>
              <th>Code Comptable</th>
              <th>Date d'achat</th>

              <th>Prix Achat</th>
              <th>Période Amortissement</th>
              <!-- <th>Valeur réelle</th> -->

              <th>Quantité1</th>
              <th>Créateur1</th>
              <th>Quantité2</th>

              <th>Créateur2</th>
              <th>quantité3</th>
              <th>Créateur3</th>
              <th
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 40px;
                "
              >
                Vérifier
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="row in importedData" :key="row._id" :id="'tr-' + row.id">
              <!-- <td>{{ row._id }}</td> -->
              <td>{{ row.id }}</td>
              <td>{{ row.reference }}</td>
              <td>{{ row.designation }}</td>

              <td>{{ row.Emplacement }}</td>
              <td>{{ row.codeCompta }}</td>
              <td>{{ row.dateAchat }}</td>

              <td>{{ row.prixAchat }} dt</td>

              <td>{{ row.periodeAmortissement }}</td>

              <!-- <td>pas encore</td> -->

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

              <td>
                <button
                  class="CasualButton green"
                  v-if="importedData.length > 0"
                  @click="updateSingleProduct(row._id, row.id)"
                >
                  Update
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
            </div>
    </div>
  </div>
</template>

<script>
import AppNavbar from "../../components/AppNavbar.vue";
import MobileSidebar from "../../components/SideBarMobile.vue";

import { HTTP } from "/axios";

import Swal from "sweetalert2";

import router from "@/router";

import moment from "moment";

export default {
  components: {
    AppNavbar,
                    MobileSidebar,

  },
  data() {
    return {
         mobileBreakpoint: 768,
      windowWidth: window.innerWidth,
      isSidebarOpen: false,
      momentObj: moment(), // Create a moment object with the desired date

      importedData: [],
      hasDifferentQuantity: false,
      Tab_ind_Err_Lignes: [],
      importButtonClick: 0,
      successfuleInventoryCreation: 0,
      successfulInventoryCreation: 1,
      showSuccessMessage: false,
    };
  },
     created() {
    this.handleResize(); 
  },
  mounted() {
                window.addEventListener('resize', this.handleResize);
    this.handleResize(); 
    document.title = "Page de vérification de comptage";
    console.log("Import button click " + this.importButtonClick);
    this.showSuccessMessage = true;
  },

  computed: {
              sidebarState() {
    return this.isSidebarOpen ? 'open' : 'closed';
  },
    formattedDate() {
      return this.formatDate(this.momentObj);
    },
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
    formatDate(moment) {
      const date = moment.format("DD/MM/YYYY");
      const time = moment.format("HH:mm");
      return `${date} - ${time}`;
    },

    addIdToImportedData() {
      let id = 1;

      for (let i = 0; i < this.importedData.length; i++) {
        this.importedData[i].id = id;
        id++;
      }
    },

    updateSingleProduct(_id, ordre) {
      let l = document.getElementById("tr-" + ordre);
      l.style = "color:black";

      let q1 = document.getElementById("input-" + ordre + "-1");
      q1.style =
        "width: 50px;  background-color:#f6f6f6;border: 1px solid #ddd;";
      let q1v = q1.value;

      let q2 = document.getElementById("input-" + ordre + "-2");
      q2.style =
        "width: 50px;  background-color:#f6f6f6;border: 1px solid #ddd;";
      let q2v = q2.value;

      let q3 = document.getElementById("input-" + ordre + "-3");
      q3.style =
        "width: 50px;  background-color:#f6f6f6;border: 1px solid #ddd;";
      let q3v = q3.value;

      alert("Quantités de l'article mises à jour   " );


      HTTP.put(
        `/ArticlesImmobiliersAPI/updateWrongArticleImmobilierComptage/${_id}`,
        {
          statut: 5,
          quantite1: q1v,
          quantite2: q2v,
          quantite3: q3v,
        }
      )
        .then((_id) => {
          console.log(`Article ${_id} updated successfully`);
        })
        .catch((error) => {
          console.error(`Error updating article ${_id}:`, error);
        });
    },

    async getArticlesDynamically() {
      this.importButtonClick = 1;
      //alert("getArticlesDynamically clicked");
      const InventId = this.$route.params.InventId;

      const AllArticles = await HTTP.get(
        `ArticlesImmobiliersAPI/allArticlesImmobiliersByLienArticleInventaire/${InventId}`
      );
      this.importedData = AllArticles.data;
      this.addIdToImportedData();
      console.log("Getting data dynamically");
      console.table(this.importedData);
    },

    async VerificationComptage() {
      //Réinitialisation à chaque clique sur le bouton submit
      this.Tab_ind_Err_Lignes = [];
      this.hasDifferentQuantity = false;
      //Réinitialisation à chaque clique sur le bouton submit

      console.log(
        "////////////////////   Le tableu de données inventaires    ////////////////////"
      );

      console.table(this.importedData);

      for (let b = 0; b < this.importedData.length; b++) {
        var ligneInventaire = document.getElementById(
          "tr-" + (parseInt(b) + 1)
        );
        ligneInventaire.style.color = "green";

        document.getElementById("input-" + (parseInt(b) + 1) + "-1").style =
          "width:50px; background:#c5e8c5";
        document.getElementById("input-" + (parseInt(b) + 1) + "-1").disabled =
          "true";

        document.getElementById("input-" + (parseInt(b) + 1) + "-2").style =
          "width:50px; background:#c5e8c5";
        document.getElementById("input-" + (parseInt(b) + 1) + "-2").disabled =
          "true";

        document.getElementById("input-" + (parseInt(b) + 1) + "-3").style =
          "width:50px; background:#c5e8c5";
        document.getElementById("input-" + (parseInt(b) + 1) + "-3").disabled =
          "true";

        let i;
        let j;

        for (i = 0; i < this.importedData.length; i++) {
          j = i + 1;
          this.importedData[i].quantite1 = document.getElementById(
            "input-" + j + "-1"
          ).value;
          this.importedData[i].quantite2 = document.getElementById(
            "input-" + j + "-2"
          ).value;
          this.importedData[i].quantite3 = document.getElementById(
            "input-" + j + "-3"
          ).value;
        }

        for (let i = 0; i < this.importedData.length; i++) {
          if (
            this.importedData[i].quantite1 != this.importedData[i].quantite2 ||
            this.importedData[i].quantite1 != this.importedData[i].quantite3 ||
            this.importedData[i].quantite1 == "" ||
            this.importedData[i].quantite2 == "" ||
            this.importedData[i].quantite3 == ""
          ) {
            this.Tab_ind_Err_Lignes.push(i + 1);
            this.hasDifferentQuantity = true;
          }
        }

        if (this.hasDifferentQuantity) {
          console.log("/////////////this.Tab_ind_Err_Lignes");
          console.table(this.Tab_ind_Err_Lignes);

          for (let i = 0; i < this.Tab_ind_Err_Lignes.length; i++) {
            document.getElementById("tr-" + this.Tab_ind_Err_Lignes[i]).style =
              "color:red";

            document.getElementById(
              "input-" + this.Tab_ind_Err_Lignes[i] + "-1"
            ).style =
              "width: 50px;  background-color: rgba(255, 131, 131, 0.3);border: 1px solid red;";

            document.getElementById(
              "input-" + this.Tab_ind_Err_Lignes[i] + "-1"
            ).disabled = false;

            document.getElementById(
              "input-" + this.Tab_ind_Err_Lignes[i] + "-2"
            ).style =
              "width: 50px;  background-color: rgba(255, 131, 131, 0.3);border: 1px solid red;";

            document.getElementById(
              "input-" + this.Tab_ind_Err_Lignes[i] + "-2"
            ).disabled = false;

            document.getElementById(
              "input-" + this.Tab_ind_Err_Lignes[i] + "-3"
            ).style =
              "width: 50px;  background-color: rgba(255, 131, 131, 0.3);border: 1px solid red;";

            document.getElementById(
              "input-" + this.Tab_ind_Err_Lignes[i] + "-3"
            ).disabled = false;
          }
        }
      }
      if (!this.hasDifferentQuantity) {
        //alert("All is good");
        console.warn("Values of the table after verification and all is good ");
        console.table(this.importedData);

        for (let i = 0; i < this.importedData.length; i++) {
          const article = this.importedData[i];

          HTTP.put(
            `/ArticlesImmobiliersAPI/updateWrongArticleImmobilierComptage/${article._id}`,
            {
              statut: 5,
              quantite1: article.quantite1,
              quantite2: article.quantite2,
              quantite3: article.quantite3,
            }
          )
            .then((article) => {
              console.log(`Article ${article._id} updated successfully`);
            })
            .catch((error) => {
              console.error(`Error updating article ${article._id}:`, error);
            });
        }

        const momentObj = moment(); // Create a moment object with the desired date
        const formattedDate = this.formatDate(momentObj);
        console.log(formattedDate);

        const InventId = this.$route.params.InventId;

        //cette requête change le statut de l'inventaire de inventaire nonArchivé à inventaireArchivé
        HTTP.put(
          `/InventairesImmobiliersAPI/updateInventoryImmobilierStatut/${InventId}`
        )
          .then((response) => {
            console.log("Inventory updated:", response.data);
          })
          .catch((error) => {
            console.error("Error updating inventory:", error);
          });

        this.successfuleInventoryCreation = 1;
        if (this.successfuleInventoryCreation == 1) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "L'inventaire a été validé et archivé avec succès",
          });
          router.push("/PagePrincipale");
        }
      }
    },
  },
};
</script>

<style scoped>


@media (max-width: 768px) {
  .container {
    padding: 10px; 
  }

  .CasualButton {
    padding: 5px;
    font-size: 12px;
  }

  .lnormalInputStyle,
  .lwrongInputStyle {
    width: 40px; 
  }
  .tableContainer{
      overflow-x: auto !important;
}
}






.tableMainContainer{
  display:flex;justify-content:center;
}

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
.navbarContainer{
  margin: 0;
  padding: 0;
}





.NavyBlue {
  background: #3b5374;
}

.NavyBlue:hover {
  background: #5375a4;
}
.green {
  background: #0d9ba5;
}

.green:hover {
  background: #407e83;
}

.InventoryNameInputContainer {
  margin-top: 100px;
}

.row-highlighted {
  background-color: #945757;
}

.CasualButton {
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;

  padding-bottom: 10px;
  border: none;
  border-radius: 5px;
  color: white;

  font-size: 16px;
  transition: opacity 0.5s;
}

.CasualButton:hover {
  cursor: pointer;
}

.red {
  background: #a81715;
}
.red:hover {
  background: #b24846;
}
.submit-button {
  background: #b84329;
}

.submit-button:hover {
  background: #b98074;
}

.import-button {
  background: #0d9ba5;
}

.import-button:hover {
  background: #78b3b7;
}

.Comptage-button {
  background: #39da8a;
}

.Comptage-button:hover {
  background: #8dcaac;
}

.Archives-button {
  background: #f9c480;
}

.Archives-button:hover {
  background: #f1d7b5;
}

.wrongInputStyle {
  background-color: rgba(255, 131, 131, 0.3);
  border: 1px solid red;
}

.normalInputStyle {
  background-color: rgba(222, 222, 222, 0.3);
  border: 1px solid lightgray;
}

.success-message {
  color: green;
  opacity: 0;
  transition: opacity 0.5s;
}

.success-message-enter-active {
  opacity: 1;
}

.success-message-leave-active {
  opacity: 0;
}
</style>
