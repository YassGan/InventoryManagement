<template>
<div>

                  <AppNavbar ></AppNavbar >

  <div class="container">
    <div style="margin-top:40px">
      <h3>Faire le travail de comptage</h3> 
    </div>
    <div class="ImportButtonContainer">
      <input type="file" ref="fileInput" @change="handleFileChange" accept=".csv" style="display: none">
    
      <button class="import-button normalButton" @click="openFileInput">Import</button> <!-- Button to trigger file input click -->
      <button v-if="importedData.length > 0" class="Comptage-button normalButton" @click="createQuantityField">Comptage</button>

      <button class="submit-button normalButton" v-if="quantityFields.length === 3" @click="checkQuantityRows">Submit</button>



      <button class="Archives-button normalButton"  @click="GoToArchive">Archives</button>





    </div>
    <div style="display:flex;justify-content:center">
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
            <th v-for="field in quantityFields" :key="field.id">Quantité {{ field.id }}</th>
          </tr>
        </thead>
        <tbody>
  <tr v-for="row in importedData" :key="row.id" :class="{ 'row-highlighted': row.highlighted }" :id="'tr-' + row.id">
    <td>{{ row.id }}</td>
    <td>{{ row.Article }}</td>
    <td>{{ row.Designation }}</td>
    <td>{{ row.Lot }}</td>
    <td>{{ row.DateFabrication }}</td>
    <td>{{ row.Date_Premption }}</td>
    <td>{{ row.Emplacements }}</td>
    <td>{{ row.Nom_Emplacement }}</td>
    <td v-for="field in quantityFields" :key="field.id">
      <input style="width:50px"
        :disabled="field.locked"
        type="number"
        min="0"
        @input="updateQuantityField($event.target.value, field.id)"
        :class="{'locked-input': field.locked}"
        :id="'input-' + row.id + '-' + field.id"
      >
    </td>
  </tr>
</tbody>

      </table>
    </div>
  </div>
</div>
</template>

<script>




import { HTTP } from '/axios';




import AppNavbar  from '../components/AppNavbar.vue';

export default {
       components: {
    AppNavbar
  },
  data() {
    return {
      count:0,
      AffichageBoutonComptage:0,
      importedData: [], 
      quantityFields: [], 
      quantityCounter: 1, 
      BadInputsTab:[],
      Tab_ind_Err_Lignes:[],
     hasDifferentQuantity :false,
           formattedDate: null


    };
  },
  mounted(){
    this.getCurrentDate();
    document.title = 'Page de comptage';


  },
  methods: {

      getCurrentDate() {
      const today = new Date();
      const day = today.getDate().toString().padStart(2, '0');
      const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
      const year = today.getFullYear();
      const hours = today.getHours().toString().padStart(2, '0');
      const minutes = today.getMinutes().toString().padStart(2, '0');
      this.formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
      return(this.formattedDate)
    },


    GoToArchive(){
      this.$router.push('/PageArchives');

    },

    async addingNewInventory() {
      try {
        let InventoryName= window.prompt("Donner un nom à votre inventarie")
        console.log(InventoryName)


        //const response = await axios.post('http://localhost:8000/addInventoryObject', {
          
          
        const response = await HTTP.post('Inventaires/addInventoryObject', {
          DateInsertion_DB: this.getCurrentDate(),
          NomInventaire: InventoryName,
          TabArticles:this.importedData,
          CreatedBy:localStorage.getItem("email")
        });
        console.log('New Inventory Object added:', response.data);
        
       
      } catch (error) {
        console.error(error);
      }
    },



    Refrshing(){
window.location.reload();
  },

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
    createQuantityField() {
      if (this.quantityFields.length >= 3) {
        return;
      }

      const quantityField = {
        id: this.quantityCounter,
        value: "",
        locked: false
      };

      this.quantityFields.forEach((field) => {
        field.locked = true;
      });

      this.quantityFields.push(quantityField);
      this.quantityCounter++;
    },
    updateQuantityField(value, fieldId) {
      this.quantityFields = this.quantityFields.map((field) => {
        if (field.id === fieldId) {
          return {
            ...field,
            value: value
          };
        }
        return field;
      });
    },


 checkQuantityRows() {

  console.warn("Bouton Submit cliqué")

//Réinitialisation à chaque clique sur l bouton submit 
  this.Tab_ind_Err_Lignes=[]
  this.hasDifferentQuantity=false
  let b;
  console.log("Imported Data tab")
  console.log(this.importedData)
for ( b = 0; b < this.importedData.length; b++) {
  console.log("tr-" + (parseInt(b) + 1));
  document.getElementById("tr-" + (parseInt(b) + 1)).style.color = "green";


  console.log("input-"+(parseInt(b))+"-1")


  document.getElementById("input-"+(parseInt(b)+1)+"-1").style="background:lightgray";
  document.getElementById("input-"+(parseInt(b)+1)+"-1").style="width:50px";
    document.getElementById("input-"+(parseInt(b)+1)+"-1").disabled="true";


  document.getElementById("input-"+(parseInt(b)+1)+"-2").style="background:lightgray";
  document.getElementById("input-"+(parseInt(b)+1)+"-2").style="width:50px";
    document.getElementById("input-"+(parseInt(b)+1)+"-2").disabled="true";


  document.getElementById("input-"+(parseInt(b)+1)+"-3").style="background:lightgray";
  document.getElementById("input-"+(parseInt(b)+1)+"-3").style="width:50px";
    document.getElementById("input-"+(parseInt(b)+1)+"-3").disabled="true";





}

  console.log("this Imported  Data ")
  console.log(this.importedData)

  console.log("//////////////////")


  console.log("Long importeData"+this.importedData.length)

  console.log("Long quantityFields"+this.quantityFields.length)


let i;
let j;

for (i=0;i<this.importedData.length;i++){
  j=i+1
  this.importedData[i].Quantite1=document.getElementById("input-"+j+"-1").value;
  this.importedData[i].Quantite2=document.getElementById("input-"+j+"-2").value;
  this.importedData[i].Quantite3=document.getElementById("input-"+j+"-3").value;

  // console.log("La valeur de l'input avec l'id input-"+j+"-1 est : "+ document.getElementById("input-"+j+"-1").value)
  // console.log("La valeur de l'input avec l'id input-"+j+"-2 est : "+ document.getElementById("input-"+j+"-2").value)
  // console.log("La valeur de l'input avec l'id input-"+j+"-3 est : "+ document.getElementById("input-"+j+"-3").value)


}


for (i=0;i<this.importedData.length;i++){
  if(this.importedData[i].Quantite1!=this.importedData[i].Quantite2 || this.importedData[i].Quantite1!=this.importedData[i].Quantite3 ){
    alert("Erreur dans la ligne numéro "+(i+1))
    this.Tab_ind_Err_Lignes.push(i+1)
    this.hasDifferentQuantity=true
          }
        }

    console.log("this Imported  Data after modification ")
    console.log(this.importedData)
    console.log("//////////////////")

    
  if (this.hasDifferentQuantity) {
    //alert("There is a quantity that differs from others. Please review the data.");
    for (i=0;i<this.Tab_ind_Err_Lignes.length;i++){
      document.getElementById("tr-"+(this.Tab_ind_Err_Lignes[i])).style="color:red"
        }
        console.log("////////////////////////////////////////////")
        console.log("Les inputs erronées doivent être débloquées")
  }
      console.log("Le tableau qui contient les indices des lignes erronées ")
      console.log(this.Tab_ind_Err_Lignes)

      let indTabErr
      for(indTabErr=0;indTabErr<this.Tab_ind_Err_Lignes.length;indTabErr++){
          console.log(indTabErr)
          document.getElementById("input-"+this.Tab_ind_Err_Lignes[(parseInt(indTabErr))]+"-1").style="  border: 1px solid #ff9999; background-color: #ffe6e6;;width:50px";
          document.getElementById("input-"+this.Tab_ind_Err_Lignes[(parseInt(indTabErr))]+"-1").disabled = false;

          document.getElementById("input-"+this.Tab_ind_Err_Lignes[(parseInt(indTabErr))]+"-2").style="  border: 1px solid #ff9999; background-color: #ffe6e6;;width:50px";
          document.getElementById("input-"+this.Tab_ind_Err_Lignes[(parseInt(indTabErr))]+"-2").disabled = false;

          document.getElementById("input-"+this.Tab_ind_Err_Lignes[(parseInt(indTabErr))]+"-3").style="  border: 1px solid #ff9999; background-color: #ffe6e6;;width:50px";
          document.getElementById("input-"+this.Tab_ind_Err_Lignes[(parseInt(indTabErr))]+"-3").disabled = false;
      }
    if (this.hasDifferentQuantity==false) {
        this.addingNewInventory();
              this.$router.push('/PageArchives');

    }

 

    }


  }
};





</script>

<style scoped>


.InventoryNameInputContainer{
  margin-top:100px ;
}



.row-highlighted {
  background-color: #945757;
}

.normalButton{
  margin-left:20px;
  margin-right: 20px;
  font-size: 16px;
  transition: opacity 0.5s;
}

.submit-button{
    background: #b84329;
}

.submit-button:hover{
    background: #b98074;
}

.import-button{
  background: #00cfdd;
}

.import-button:hover{
  background: #78b3b7;
}

.Comptage-button{
    background: #39da8a;

}

.Comptage-button:hover{
    background: #8dcaac;

}

.Archives-button{
      background: #f9c480;

}

.Archives-button:hover{
      background: #f1d7b5;

}

.normalInputStyle{
  background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3));
}

.wrongInputStyle{
    background-color: -internal-light-dark(rgba(255, 131, 131, 0.3), rgba(186, 40, 40, 0.3));

}



</style>
