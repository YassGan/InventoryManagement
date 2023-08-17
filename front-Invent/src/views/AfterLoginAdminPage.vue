<template>
  <div class="welcome-page">

    <div class="WelcomeBlock">
    <h1>Bonjour, {{ username }}!</h1>
    <p>Choisissez une option :</p>
    <div class="button-container">
      <button
        class="CasualButton BlueButton"
        @click="navigateTo('ArticlesImmobiliers')"
        :disabled="!isArticleImmobilierUser"
      >
        Articles Immobiliers
      </button>
      <button
        class="CasualButton BeigeButton"
        @click="navigateTo('ArticlesOrdinaires')"
        :disabled="!isArticleOrdinaireUser"
      >
        Articles Ordinaires
      </button>
    </div>
        </div>

  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      username: '',
      roleAdmin:'',
      isArticleImmobilierUser: false,
      isArticleOrdinaireUser: false// 
    };
  },
  mounted() {

        const User_loggedin_info = localStorage.getItem('User_loggedin_info');
    if (User_loggedin_info) {
      const User_loggedin_info_Object= JSON.parse(User_loggedin_info);
      console.log("User_loggedin_info")
            console.log(User_loggedin_info_Object)

    this.username = User_loggedin_info_Object.nomAdminSociete;
    this.roleAdmin= User_loggedin_info_Object.role;

    if (this.roleAdmin=="admin_immo"){
        this.isArticleImmobilierUser=true;
    }
    if (this.roleAdmin=="admin_produit"){
        this.isArticleOrdinaireUser=true;
    }
        if (this.roleAdmin=="admin_mixte"){
        this.isArticleOrdinaireUser=true;
        this.isArticleImmobilierUser=true;

    }

    }
    this.isImmobilierUser = true;
  },
  methods: {
    navigateTo(option) {
      if (option === 'ArticlesImmobiliers') {

    


        localStorage.setItem("OptionAdmin",'admin_immo')
        console.log('Navigate to Articles Immobiliers page');
        router.push('/PagePrincipale')

        


      } else if (option === 'ArticlesOrdinaires') {
                localStorage.setItem("OptionAdmin",'admin_produit')
        console.log('Navigate to Articles Immobiliers page');
             router.push('/PagePrincipale')

        console.log('Navigate to Articles Ordinaires page');
      }
    }
  }
};
</script>
<style scoped>
.welcome-page {
  text-align: center;
  margin: 20px;
  background: rgb(245, 247, 250);
  height: 100vh;
  padding: 0;
  margin: 0;
}

h1 {
  font-size: 24px;
  margin-bottom: 10px;
}

.button-container {
  display: flex;
  justify-content: center;
  padding-top: 20px;
}

button {
  margin: 0 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.CasualButton {
  margin-left: 20px;
  margin-right: 20px;
  padding-top:10px;
  padding-left:20px;
  padding-right:20px;


  padding-bottom:10px;
  border: none;
  border-radius: 5px;
  color: white;

  font-size: 16px;
  transition: opacity 0.5s;
}

.BlueButton{
background: rgb(14, 80, 107);
}
.BlueButton:hover{
background: rgb(29, 110, 142);
}

.BeigeButton{
background: rgb(142, 125, 29);
}

.BeigeButton:hover{
    background: rgb(168, 151, 56);

}


/* Style for disabled button */
button[disabled] {
  background-color: #868686;
  cursor: not-allowed;
}
button[disabled]:hover {
  background-color: #86868662;
  cursor: not-allowed;
}


.WelcomeBlock{
padding-top: 200px;
}
</style>
