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


    <div class="container">
      <div style="margin-top: 40px">
        
        <!-- Affichage de données -->
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

        <h3 style="margin-top:20px" class="PageTilte" >Créer un nouveau inventaire</h3>
      </div>

      <input
        type="text"
        id="nomNvInventaire"
        v-model="nomNvInventaire"
        placeholder="Saisir le nom du nouveau inventaire"
        class="InputSearch"
        required
      />

      <div class="ImportAjouterButtonContainer">
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

        <button
          :disabled="isSearchInputEmpty || isImportedDataEmpty"
          class="import-button ajouter-button"
          @click="ajouter_Articles_DB"
        >
          Ajouter
        </button>

        <h4>Importer de nouveaux articles</h4>
      </div>


<div style="display:flex;justify-content:center">
      <table style="margin-bottom: 150px" class="data-table">
        <thead>
          <tr>
            <th>Ordre</th>
            <th>Référence</th>
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
  </div>
</template>





<script>
import moment from "moment";
import AppNavbar from "../components/AppNavbar.vue";
import MobileSidebar from "../components/SideBarMobile.vue";

import Swal from "sweetalert2";
import router from "@/router";
import { HTTP } from "/axios";
export default {
  components: {
    AppNavbar,
    MobileSidebar,
  },
  data() {
    return {
          isAddingInProgress: false,

      importedData: [],
      momentObj: moment(),
      nomNvInventaire: "",
      maxArticles: 0,
      maxInventaires: 0,
      nombreInventairesArchivés: 0,
      nombreInventairePasEncoreValidés: 0,
      testMaxInv:false,
            mobileBreakpoint: 768,
      windowWidth: window.innerWidth,
      isSidebarOpen: false,
    };
  },
  computed: {
      sidebarState() {
    return this.isSidebarOpen ? 'open' : 'closed';
  },
    formattedDate() {
      return this.formatDate(this.momentObj);
    },
    isSearchInputEmpty() {
      return this.nomNvInventaire.length === 0;
    },
    isImportedDataEmpty() {
      return this.importedData.length === 0;
    },
  },
  mounted() {
    document.title = "Affichage Inventaire";
    this.gettingPackageInfo();
                window.addEventListener('resize', this.handleResize);
    this.handleResize(); 
  },
      created() {
    this.handleResize(); 
  },
  methods: {
        showEmptyInputPopup() {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Veuillez entrer le nom de l'inventaire",
      });
    },

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

    async gettingMaxUsers() {
      // const response = await HTTP.get("ArticlesAPI/addArticle", {
    },
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
    async ajouter_Articles_DB() {
  this.isAddingInProgress = true;

      // alert(this.maxInventaires - (this.nombreInventairesArchivés +this.nombreInventairePasEncoreValidés))
      if(  this.maxInventaires - (this.nombreInventairesArchivés +this.nombreInventairePasEncoreValidés)<=0){
                Swal.fire({
          icon: "error",
          title: "Error",
          text: "Vous avez atteint le nombre maximal d'inventaires de votre pack",
        });
        this.testMaxInv=true;
      }

      if(this.testMaxInv==false){

      console.table(this.importedData);
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
          console.table(articleData);
          const momentObj = moment();
          const formattedDate = this.formatDate(momentObj);
          // console.log(formattedDate);
          const response = await HTTP.post("ArticlesAPI/addArticle", {
            reference: articleData.Article,
            designation: articleData.Designation,
            lot: articleData.Lot,
            dateFabrication: articleData.DateFabrication,
            datePeremption: articleData.Date_Premption,
            Emplacement: articleData.Emplacements,
            quantite1: "",
            createur1: "",
            quantite2: "",
            createur2: "",
            quantite3: "",
            createur3: "",
            statut: "1",
            idSoc: User_loggedin_info_Object.idSociete,
            lienArticleInventaire: randomString,

            dateInsertion_DB: formattedDate,
          });
          console.log("Données du nouveau article ajouté");
          console.log(response.data);
          console.log("Données du nouveau article ajouté");
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
          "Inventaires_non_verifiesAPI/addInventaire_non_verifie",
          {
            DateInsertion_DB: formattedDate,
            nomInventaire: this.nomNvInventaire,
            lienArticleInventaire: randomString,
            statut: "nonArchivé",

            idSoc: User_loggedin_info_Object.idSociete,
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error adding article:", error);
      }
      }
        this.isAddingInProgress = false;

    },
    openFileInput() {
      this.$refs.fileInput.click();

         // Check if input field is empty
    if (this.isSearchInputEmpty) {
      this.showEmptyInputPopup(); // Show the pop-up message
      return; // Stop further execution
    }
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
          !row.Date_Premption ||
          !row.Emplacements ||
          !row.Nom_Emplacement
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
          console.table(this.importedData);
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

.PageTilte{
  margin-top:-30px;
  margin-bottom: 30px;
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
  background-color: black;
  margin: 4px auto;
}
.navbarContainer{
  margin: 0;
  padding: 0;
}



@media (max-width: 600px) {

  .data-table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
    font-size: 0.9rem;
  }
  
  .container {
    padding: 10px;    
  }

  h3 {
    margin-bottom: 0.5rem;
  }
    h3{
  font-size: 16px;
  margin-top: 42px !important;
}

  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .buttons {
    flex-direction: column;
  }

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

.ImportAjouterButtonContainer {
}
.container {
  max-width: 100%;
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

.data-table {
  width: 85%;
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
}
</style>


