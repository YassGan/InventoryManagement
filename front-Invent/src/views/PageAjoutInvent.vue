<template>
  <div class="container">
    <h1 class="AjouterInvent">Ajouter Inventaire</h1>
    <p> Merci d'ajouter les données nécessaires de l'inventaire que vous souhaitez ajouter </p>
    <form @submit="addInventaire" class="form">
      <label for="date">Date:</label>
      <input type="text" id="date" v-model="date" required><br><br>
      
      <label for="ref">Ref:</label>
      <input type="text" id="ref" v-model="ref" required><br><br>
      
      <label for="nomArticle">Nom Article:</label>
      <input type="text" id="nomArticle" v-model="nomArticle" required><br><br>
      
      <label for="emplacement">Emplacement:</label>
      <input type="text" id="emplacement" v-model="emplacement" required><br><br>
      
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      date: '',
      ref: '',
      nomArticle: '',
      emplacement: '',
    };
  },
  
  methods: {
    async addInventaire(event) {
      event.preventDefault();

      try {
        const response = await axios.post('http://localhost:8000/addInvent', {
          Date: this.date,
          Ref: this.ref,
          NomArticle: this.nomArticle,
          Emplacement: this.emplacement,
        });
        console.log('New inventory added:', response.data);

        // Reset the form after successful submission
        this.date = '';
        this.ref = '';
        this.nomArticle = '';
        this.emplacement = '';
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 10px;
}

input[type="text"] {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.AjouterInvent{
    padding-bottom: 20px;
}

p{
    padding-bottom: 20px;
}
</style>
