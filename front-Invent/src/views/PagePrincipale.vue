<template>
<div>
<AppNavbar> </AppNavbar>
  <div class="accueil">
    <h1>Bienvenue sur votre site web</h1>
    <div class="fonctionnalites">
      <div class="fonctionnalite">
        <h2>Visualisation de fichiers CSV</h2>
        <p>Consultez le contenu d'un fichier CSV contenant principalement des données de produits et des informations connexes.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Tâche de comptabilité</h2>
        <p>Importez un fichier CSV et effectuez une vérification comptable. Mettez en évidence les divergences et assurez une comptabilité précise.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Correction de données</h2>
        <p>Corrigez les lignes incorrectes après la vérification comptable pour garantir l'exactitude et la cohérence des données.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Création d'inventaire</h2>
        <p>Créez un nouvel élément d'inventaire et ajoutez-le à la base de données pour le suivi et la gestion.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Inventaires précédents</h2>
        <p>Consultez vos inventaires précédents pour avoir un historique des données d'inventaire.</p>
      </div>
      <div class="fonctionnalite">
        <h2>Exportation des détails de l'inventaire</h2>
        <p>Cliquez sur un inventaire spécifique pour voir ses détails et les télécharger au format PDF ou CSV.</p>
      </div>
     
      <div class="fonctionnalite">
        <h2>Télécharger le modèle CSV</h2>
        <p>Il est obligatoire d'utiliser ce modèle .CSV pour le travail de comptage. Vous allez être redirigé vers un drive où vous devez télécharger le modèle du fichier</p>
         <div>
          <a href="https://drive.google.com/file/d/18P-g8toe03ms_mZKSr9luRP6188p8E0y/view?usp=sharing">
    <button >Télécharger CSV</button>
          </a>
  </div>
      </div>


    </div>
  </div>
</div>
</template>

<style scoped>
.accueil {
  text-align: center;
  padding: 40px;
}

.fonctionnalites {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-top: 40px;
}

.fonctionnalite {
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  color: #555;
}
</style>


<script>
import AppNavbar from '../components/AppNavbar.vue';

export default ({
   components: {
    AppNavbar,
  },

    mounted() {
        document.title = 'Home';

  },


  methods:{
    downloadCSV() {
      const filePath = require('@/assets/data.csv');
      const downloadLink = document.createElement('a');
      downloadLink.href = filePath.default;
      downloadLink.download = 'data.csv';
      downloadLink.click();
    },
    convertToCSV(data) {
      const header = Object.keys(data[0]).join(';');
      const rows = data.map(row => Object.values(row).join(';'));
      return header + '\n' + rows.join('\n');
    },
  }
})
</script>
