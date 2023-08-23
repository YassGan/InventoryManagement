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















    <div></div>

    <div style="max-width:1300px" class="container">
      <div style="margin-top: 40px">
        <!-- <div v-if="importedData.length == 0">
          <p>
            Inventaires pas encore validés :
            {{ this.nombreInventairePasEncoreValidés }}
          </p>

          <p>Inventaires archivés : {{ this.nombreInventairesArchivés }}</p>
          <p>
            Il vous reste :
            {{
              this.maxInventaires -
              (this.nombreInventairesArchivés +
                this.nombreInventairePasEncoreValidés)
            }}
          </p>
        </div> -->
      </div>
      <div>
        <h3>Créer un nouveau inventaire d'articles immobiliers</h3>

        <input
          type="text"
          id="nomNvInventaire"
          v-model="nomNvInventaire"
          placeholder="Saisir le nom du nouveau inventaire"
          class="InputSearch"
          required
        />
      </div>

      <div
        style="
          display: flex;
          justify-content: center;
          padding-bottom: 20px;
          margin-top: -30px;
        "
        class="codification"
      ></div>

      <div style="display: flex; justify-content: center; align-items: center">
        <div style="display: flex"></div>
        <!-- Use the custom 'PopupDialog' component -->
        <PopupDialog :show="showPopup" @closePopup="closeMyPopup">
          <!-- Pop-up content here -->
          <div style="width: 800px; height: 310px">
            <h2 style="margin-top: -5px">Codification</h2>
            <div style="" class="codification-container">
              <div
                style="display: flex; justify-content: center; padding-top: 5px"
              >
                <div>
                  <div class="input-group">
                    <div class="input-label" style="">
                      <label for="suffix">Suffix : </label>
                    </div>
                    <input
                      type="text"
                      id="suffix"
                      v-model="suffix"
                      placeholder="suffix"
                      required
                      class="codification-input"
                    />
                  </div>

                  <!-- <div class="input-group">
    <div class="input-label">
    <label for="suffix" >Format date :</label>
    </div>    <select @change="showSelectedItem" v-model="Format_Date" required class="codification-select">
      <option value="" disabled selected>Format Date</option>
      <option value="AA">AA</option>
      <option value="MM">MM</option>
      <option value="JJ">JJ</option>
    </select>
  </div> -->

                  <div class="input-group">
                    <div class="input-label">
                      <label for="suffix">Numéro :</label>
                    </div>
                    <input
                      type="number"
                      id="Numero"
                      v-model="Numero"
                      placeholder="Numero"
                      required
                      class="codification-input"
                      style="width: 65px; height: 50px; font-size: 16px"
                      max="9999"
                      @input="checkMaxValue"
                    />
                  </div>

                  <div class="input-group">
                    <div class="input-label">
                      <label
                        style="
                          background: ;
                          height: 70px;
                          display: flex;
                          align-items: center;
                        "
                        for=""
                        >Format Date :</label
                      >
                    </div>

                    <div>
                      <select
                        style="margin-bottom: 5px"
                        required
                        class="codification-select"
                        v-model="selectedOption"
                        @change="addToDisplay"
                      >
                        <option value="" disabled selected>Format Date</option>
                        <option
                          v-for="option in selectOptions"
                          :key="option"
                          :value="option"
                        >
                          {{ option }}
                        </option>
                      </select>

                      <!-- Div to display selected options -->
                      <div
                        style="position: absolute; margin-top: 2px"
                        class="display-area"
                      >
                        <span
                          v-for="displayedOption in displayedOptions"
                          :key="displayedOption"
                        >
                          <span
                            style="
                              border: 1px solid black;
                              margin: 5px;
                              border-radius: 5px;
                              padding: 2px 10px 2px 10px; /* top right bottom left */
                            "
                          >
                            {{ displayedOption }}
                            <span
                              @click="removeFromDisplay(displayedOption)"
                              class="closeDateElement"
                              style="
                                color: red;
                                margin-bottom: 100px;
                                font-size: 10px;
                                margin-bottom: -15px;
                              "
                            >
                              X
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    id="CodificationString"
                    style="margin-top: 30px; font-size: 25px"
                  >
                    {{ suffix }}-{{ Numero }}-{{ dateFormatString }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PopupDialog>
      </div>

      <div class="ImportAjouterButtonContainer">
        <button class="import-button green" @click="openMyPopup">
          Codification
        </button>
        <input
          type="file"
          ref="fileInput"
          @change="handleFileChange"
          accept=".csv"
          style="display: none"
        />
        <button
          :disabled="isSearchInputEmpty"
          class="import-button"
          @click="openFileInput"
        >
          Import
        </button>

        <!-- <button           @mouseover="getTooltipContent()"> empty input </button> -->

        <button
          :disabled="isSearchInputEmpty || isImportedDataEmpty"
          class="import-button ajouter-button"
          @click="ajouter_Articles_Immobilier_DB"
        >
          Ajouter
        </button>

        <div>
          <div 
            style="display: flex; align-items: center"
            v-if="!isSearchInputEmpty & this.showHamburger==false"
          >
            <div
              style="
                display: flex;
                justify-content: start;
              "
            >

            <div style="display:flex;justify-content:center;align-items:center;margin-right:50px;margin-left:20px">
              <h4 style="font-size: 16px; font-weight: 600;margin-right:10px">
                Nom Inventaire : 
              </h4>
              {{ nomNvInventaire }}
            </div>
            </div>
     
            <div style="display:flex;justify-content:center;align-items:center;margin-right:50px">
              <h4 style="font-size: 16px; font-weight: 600;margin-right:10px">
                Codification :
              </h4>
                 {{ suffix }}-{{ Numero }}-{{ dateFormatString }}
            </div>
          </div>
          <!-- <h4  style="margin-top:px">Importer de nouveaux articles immobiliers</h4> -->
        </div>
      </div>


      <div class="tableMainContainer" >
      <div class="tableContainer" >

      <table style="margin-top: 10px" class="data-table">
        <thead>
          <tr>
            <th>Ordre</th>
            <th>Référence</th>
            <th>Désignation</th>

            <th>Emplacements</th>
            <th>Code Comptable</th>
            <th>Date d'achat</th>

            <th>Prix Achat</th>
            <th>Période Amortissement</th>
            <!-- <th>Valeur réelle</th> -->
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in importedData" :key="index">
            <td>{{ row.id }}</td>
            <td>{{ row.Article }}</td>
            <td>{{ row.Designation }}</td>

            <td>{{ row.Emplacements }}</td>
            <td>{{ row.codeCompta }}</td>
            <td>{{ row.dateAchat }}</td>

            <td>{{ row.prixAchat }} dt</td>
            <td>{{ row.periodeAmortissement }} ans</td>
            <!-- <td>pas encore faite dynamiquement</td> -->
          </tr>
        </tbody>
      </table>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import AppNavbar from "../../components/AppNavbar.vue";
import PopupDialog from "../../components/PopupDialog.vue"; // Adjust the path based on your project structure
import MobileSidebar from "../../components/SideBarMobile.vue";

import Swal from "sweetalert2";
import router from "@/router";
import { HTTP } from "/axios";
export default {
  components: {
    AppNavbar,
    PopupDialog,
                    MobileSidebar,

  },
  data() {
    return {
                isAddingInProgress: false,

      testMaxInv:false,
           mobileBreakpoint: 768,
      windowWidth: window.innerWidth,
      isSidebarOpen: false,
      importedData: [],
      momentObj: moment(),
      nomNvInventaire: "",
      maxArticles: 0,
      maxInventaires: 0,
      nombreInventairesArchivés: 0,
      nombreInventairePasEncoreValidés: 0,
      Format_Date: "ee",
      suffix: "",
      Numero: "",
      showPopup: false,
      dateFormatString: "",

      selectOptions: ["MM", "JJ", "AA", "AAAA"],
      selectedOption: "",
      displayedOptions: [],
      codificationString: "",
      ajouterButtonClicked:0
    };
  },
     created() {
    this.handleResize(); 
  },
  computed: {
        sidebarState() {
    return this.isSidebarOpen ? 'open' : 'closed';
  },
    formattedDate() {
      return this.formatDate(this.momentObj);
    },
    isSearchInputEmpty() {
      return (
        this.nomNvInventaire.length === 0 ||
        this.suffix.length === 0 ||
        this.Numero.length === 0 ||
        this.dateFormatString.length === 0
      );
    },
    isImportedDataEmpty() {
      return this.importedData.length === 0;
    },
    isCodificationEmpty() {
      return (
        this.suffix.length === 0 ||
        this.Numero.length === 0 ||
        this.dateFormatString.length === 0
      );
    },
  },
  mounted() {
    document.title = "Affichage Inventaire";
    this.gettingPackageInfo();
          window.addEventListener('resize', this.handleResize);
    this.handleResize(); 
              window.addEventListener('resize', this.handleResize);
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
    addToDisplay() {
      this.dateFormatString = "";
      if (this.selectedOption) {
        this.displayedOptions.push(this.selectedOption);
        const index = this.selectOptions.indexOf(this.selectedOption);
        if (index !== -1) {
          this.selectOptions.splice(index, 1);
        }
        this.selectedOption = "";
      }
      console.log("--> Le string " + this.displayedOptions);

      for (let i = 0; i < this.displayedOptions.length; i++) {
        this.dateFormatString += this.currentDate(this.displayedOptions[i]);
      }
    },
    removeFromDisplay(option) {
      this.dateFormatString = "";

      const index = this.displayedOptions.indexOf(option);
      if (index !== -1) {
        this.displayedOptions.splice(index, 1);
        this.selectOptions.push(option);
      }
      for (let i = 0; i < this.displayedOptions.length; i++) {
        this.dateFormatString += this.currentDate(this.displayedOptions[i]);
      }
    },

    openMyPopup() {
      this.showPopup = true;
    },
    closeMyPopup() {
      this.showPopup = false;
    },
    checkMaxValue() {
      if (this.Numero > 9999) {
        this.Numero = 9999;
      }
    },
    getTooltipContent() {
      const tooltipContent = [];

      if (this.nomNvInventaire.length === 0) {
        tooltipContent.push("Le nom de l'inventaire est manquant ");
      }
      if (this.suffix.length === 0) {
        tooltipContent.push("Le suffix est manquant");
      }
      if (this.Numero.length === 0) {
        tooltipContent.push("Le numéro est maquant");
      }
      if (this.Format_Date.length === 0) {
        tooltipContent.push("Le format de la date est manquant ");
      }
      alert(tooltipContent.join(", "));
    },

    currentDate(format) {
      const momentObj = moment();
      switch (format) {
        case "AAAA":
          return momentObj.format("YYYY");
        case "AA":
          return momentObj.format("YY");
        case "MM":
          return momentObj.format("MM");
        case "JJ":
          return momentObj.format("DD");
        default:
          return null;
      }
    },

    showSelectedItem() {
      console.log("the chosden date format " + this.currentDate());
    },

    async gettingPackageInfo() {
      const User_loggedin_societe_package_info = localStorage.getItem(
        "User_loggedin_societe_package_info"
      );
      this.User_loggedin_societe_package_info = JSON.parse(
        User_loggedin_societe_package_info
      );
      console.log("      console.log(User_loggedin_societe_package_info);");
      console.log(this.User_loggedin_societe_package_info);

      const User_loggedin_info = localStorage.getItem("User_loggedin_info");
      this.User_loggedin_info_Object = JSON.parse(User_loggedin_info);

      console.log("User logged in info object");
      console.log(this.User_loggedin_info_Object);

      this.maxArticles = this.User_loggedin_societe_package_info.maxArticles;
      this.maxInventaires =
        this.User_loggedin_societe_package_info.maxInventaires;

      const responseInventairesnonValidés = await HTTP.get(
        `Inventaires_non_verifiesAPI/getAllInventaires_non_verifie/${this.User_loggedin_info_Object.idSociete}`
      );
      console.log("nombre d'inventaires non archivés ");
      console.log(responseInventairesnonValidés.data.length);
      this.nombreInventairePasEncoreValidés =
        responseInventairesnonValidés.data.length;

      const responseInventaireValidés = await HTTP.get(
        `Inventaires_non_verifiesAPI/getAllInventaires_archives/${this.User_loggedin_info_Object.idSociete}`
      );
      console.log("nombre d'inventaires  archivés ");
      console.log(responseInventaireValidés.data.length);
      this.nombreInventairesArchivés = responseInventaireValidés.data.length;
    },

    async gettingMaxUsers() {},
    formatDate(moment) {
      const date = moment.format("DD/MM/YYYY");
      const time = moment.format("HH:mm");
      return `${date} - ${time}`;
    },
    generateRandomString(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;

      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    },
    async ajouter_Articles_Immobilier_DB() {
        this.isAddingInProgress = true;

    // pour assurer que l'action de stockage dans la base de données ne se fait qu'une seule fois s'il clique sur le bouton ajouter plus qu'une fois


      if(  this.maxInventaires - (this.nombreInventairesArchivés +this.nombreInventairePasEncoreValidés)<=0){
                Swal.fire({
          icon: "error",
          title: "Error",
          text: "Vous avez atteint le nombre maximal d'inventaires de votre pack",
        });
        this.testMaxInv=true;
      }



      if(this.testMaxInv==false){

    if(this.ajouterButtonClicked===0){
              this.ajouterButtonClicked++;

    //console.table(JSON.stringify(JSON.parse(this.importData)));
      const randomString = this.generateRandomString(10);

      //getting user logged in info data from the localStorage
      const User_loggedin_info_String =
        localStorage.getItem("User_loggedin_info");
      const User_loggedin_info_Object = JSON.parse(User_loggedin_info_String);
      console.log("      console.log(User_loggedin_info_Object);");
      console.log(User_loggedin_info_Object);

      // l'ajout de nouveaux articles et leur nouveau inventaire en même temps à la base de données
      try {
        for (let articleData of this.importedData) {
          console.log("Table des articles");
          const momentObj = moment();
          const formattedDate = this.formatDate(momentObj);
          // console.log(formattedDate);
          const response = await HTTP.post(
            "ArticlesImmobiliersAPI/addArticleImmobilier",
            {
              dateAchat: articleData.dateAchat,
              periodeAmortissement: articleData.periodeAmortissement,
              prixAchat: articleData.prixAchat,
              codeCompta: articleData.codeCompta,
              reference: articleData.Article,
              designation: articleData.Designation,
              Emplacement: articleData.Emplacements,
              quantite1: "",
              createur1: "",
              quantite2: "",
              createur2: "",
              quantite3: "",
              createur3: "",
            codification:this.suffix+'-'+this.Numero+'-'+this.dateFormatString,
              statut: "1",
              idSoc: User_loggedin_info_Object.idSociete,
              lienArticleInventaire: randomString,
              dateInsertion_DB: formattedDate,
            }
          );
          console.log("Données du nouveau article immo ajouté");
          console.log(response.data);
          console.log("Données du nouveau article immo ajouté");
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Vos articles ont été ajouté avec succès",
        });
        router.push("/PagePrincipale");
      } catch (error) {
        console.error("Error adding article:", error);
      }

      // l'ajout du nouveau inventaire à la base de données
      try {
        const momentObj = moment();
        const formattedDate = this.formatDate(momentObj);
        const response = await HTTP.post(
          "InventairesImmobiliersAPI/addInventaire_Immobilier",
          {
            DateInsertion_DB: formattedDate,
            nomInventaire: this.nomNvInventaire,
            lienArticleInventaire: randomString,
            codification:this.suffix+'-'+this.Numero+'-'+this.dateFormatString,
            statut: "nonArchivé",

            idSoc: User_loggedin_info_Object.idSociete,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error adding article:", error);
      }
    }
      }
        this.isAddingInProgress = false;

   },
    openFileInput() {
     
      this.$refs.fileInput.click();
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
    validateImportedData(data) {
      const validationErrors = [];
      const rowOccurrences = new Map();
      console.log(this.importedData);

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rowStr = JSON.stringify(row);

        if (rowOccurrences.has(rowStr)) {
          const count = rowOccurrences.get(rowStr);
          rowOccurrences.set(rowStr, [...count, i + 1]);
        } else {
          rowOccurrences.set(rowStr, [i + 1]);
        }

        if (
          !row.Article ||
          !row.Designation ||
          !row.Lot ||
          !row.DateFabrication ||
          !row.Emplacements ||
          !row.periodeAmortissement ||
          !row.dateAchat ||
          !row.codeCompta ||
          !row.prixAchat
        ) {
          validationErrors.push(
            `-> Des données manquantes dans la ligne avec l'id ${row.id}`
          );
        }
      }

      for (const [rowStr, lineNumbers] of rowOccurrences.entries()) {
        if (lineNumbers.length > 1) {
          const rowObj = JSON.parse(rowStr);
          const orderNumbers = lineNumbers
            .map((lineNumber) => `${lineNumber + 1}`)
            .join(", ");
          validationErrors.push(
            `-> L'article dans l'ordre ${rowObj.id} est répété ${lineNumbers.length} fois dans la ligne n°${orderNumbers}`
          );
        }
      }

      return validationErrors;
    },

    async handleFileChange(event) {
      this.importedData = [];
      this.validationErrors = [];
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        const parsedData = this.parseCSV(contents);

        if (
          parsedData.length >
          this.User_loggedin_societe_package_info.maxArticles
        ) {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text:
              "Le nombre de lignes dans le fichier CSV est supérieur au maximum d'articles autorisé de votre pack qui est " +
              this.User_loggedin_societe_package_info.maxArticles,
            width: "60%",
          });
          return;
        }

        const validationErrors = this.validateImportedData(parsedData);

        if (validationErrors.length === 0) {
          this.importedData = parsedData;
          console.log("Tab des articles importés");
          console.table(JSON.parse(JSON.stringify(this.importedData)));
        } else {
          console.error("Validation errors:", validationErrors);
          const errorMessage = validationErrors.join("\n");
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Il y a des erreurs de validation:",
            html: `<pre>${errorMessage}</pre>`,
            width: "60%",
          });
        }
      };
      reader.readAsText(file);
    },

    importData() {
      console.log("The imported Data ");
    },
  },
};
</script>

<style scoped>





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
  transition: transform 0.3s ease; 
}
.hamburger-button span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: black;
  margin: 4px auto;
}


@media (max-width: 768px) {
  .container {
    width:90% !important;
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


.tableContainer{
  width: 100%;
}




.InputSearch {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 30px;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  width: 300px;
}

.InputSearch:hover,
.InputSearch:focus {
  border-color: #c9c546;
}


.container {
  margin: 0 auto;
  padding: 20px;
  width: 100%;
}

.import-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px;
}

.import-button:hover {
  background-color: #3d9afe;
}

.ajouter-button {
  background-color: #c9c546;
}

.ajouter-button:hover {
  background-color: #9d9a4d;
}

.green {
  background-color: #46c9ad;
}

.green:hover {
  background-color: #3d907e;
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

button[disabled] {
  cursor: not-allowed;
} /* Add appropriate styles to make the codification block more organized */
.codification-container {
  display: flex;
  flex-direction: column;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-label {
  width: 120px;
  text-align: right;
  margin-right: 10px;
  display: flex;
  justify-content: start;
  font-size: 17px;
  font-family: "Open Sans", sans-serif;
}

.codification-input {
  width: 50px;
  height: 50px;
  font-size: 16px;
}

.codification-select {
  width: 120px;
  height: 40px;
  font-size: 16px;
}
.display-area {
  font-size: 20px;
}

.closeDateElement {
  cursor: pointer;
}




</style>
