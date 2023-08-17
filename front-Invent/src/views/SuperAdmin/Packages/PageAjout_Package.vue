<template>
  <div>
    <SuperAdminNavbar> </SuperAdminNavbar>

    <div class="PageContainer">
   
      <div class="buttonsTitleContainer">

        <h3 class="" style="margin-bottom:20px;margin-top:63px">
          Entrer les données du nouveau package
        </h3>

        <form>
          <div>
            <input
              type="text"
              v-model="nomPackage"
              placeholder="Nom du package"
              class="form-control"
              
            />
          </div>

          <div>
            <input
              type="number"
              v-model="maxInventaires"
              placeholder="Nombre max d'inventaires"
              class="form-control"
              
            />
          </div>

          <div>
            <input
              type="number"
              v-model="prixPackage"
              placeholder="Prix du package"
              class="form-control"
              
            />
          </div>

          <div>
            <input
              type="number"
              v-model="maxUsers"
              placeholder="Nombre max d'utilisateurs"
              class="form-control"
              
            />
          </div>

          <div>
            <input
              type="number"
              v-model="maxArticles"
              placeholder="Nombre max d'articles"
              class="form-control" 
              
            />
          </div>
          


      <div>
          <textarea placeholder="Description" v-model="description" rows="5" cols="40"></textarea>

          </div>



          <div>
            <button class="button green" @click="addPackage">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import router from "@/router";
import SuperAdminNavbar from "@/components/SuperAdminNavbar.vue";
import { HTTP } from "/axios";
import Swal from 'sweetalert2';
import moment from 'moment';

export default {
  data(){
        return {
                momentObj: moment(), // Create a moment object with the desired date

        nomPackage:'',
        prixPackage:'',
        maxInventaires:'',
        maxUsers:'',
        maxArticles:'',
        description:''
    };
    
      
  },
  computer:{
     formattedDate() {
      return this.formatDate(this.momentObj);
    }
  },
  components: {
    SuperAdminNavbar,
  },
  methods: {
      formatDate(moment) {
    const date = moment.format('DD/MM/YYYY');
    const time = moment.format('HH:mm');
    return `${date} - ${time}`;
  },
    logout() {
      router.push("/SuperAdminLoginPage");
    },
   async addPackage(event) {
    const momentObj = moment();
const formattedDate = this.formatDate(momentObj);
console.log(formattedDate);

            event.preventDefault(); // Empêche le rechargement de la page par défaut

      const data = {
        nomPackage: this.nomPackage,
        prixPackage: this.prixPackage,
        maxInventaires: this.maxInventaires,
        maxUsers: this.maxUsers,
        maxArticles: this.maxArticles,
        description:this.description
      };
      console.log(data);
       try {
        const response = await HTTP.post("PackageAPI/addPackage", {
          nomPackage: data.nomPackage,
          prixPackage: data.prixPackage,
          maxInventaires: data.maxInventaires,
          maxUsers: data.maxUsers,
          maxArticles: data.maxArticles,
          description:data.description,
          dateInsertion_DB:formattedDate

        });
     
console.log(response);
   Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Package créé avec succès',
        });
        this.nomPackage='';
        this.prixPackage='';
        this.maxInventaires='';
        this.maxUsers='';
        this.maxArticles='';
                this.description='';

    
      } catch (error) {
        if (error.response) {
          this.errorMessage = error.response.data.error;
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    },
  },
};
</script>

<style scoped>

.blueNavy{
  background: #15535e;
}

.blueNavy:hover{
  background: #3c9bac;
}

.form-control {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.form-control:focus {
  border-color: #333;
  outline: none;
}

.navbar-right {
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 20px;
  padding-top: 20px;
}

.navbar-right:hover {
  padding-right: 30px;
  transition: 500ms;
}

.buttonsTitleContainer {
  margin-top: 35px;
}
.PageContainer {
  display: flex;
  justify-content: center;
  background: #e0e6ed;
  height: 100vh;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button {
  padding: 10px 20px;
  margin: 10px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.green {
  background-color: #4bc04b;
}

.green:hover {
  background-color: #306530;
}

.blue {
  background-color: #197484;
}

.blue:hover {
  background-color: #15535e;
}

.yellow {
  background-color: #c7bb35;
}

.yellow:hover {
  background-color: #8a8229;
}

.logout .logout-button {
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-button:hover {
  animation: attention 1s infinite alternate;
}

.logout-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}

.logoutWord {
  padding-right: 3px;
}
</style>
