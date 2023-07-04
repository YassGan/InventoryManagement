<template>
  <div class="error-page">
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 text-center">
          <h1 class="error-page__title">Erreur</h1>
          <p class="error-page__message">Oups! Une erreur s'est produite.</p>
          <p class="error-page__description">Nous sommes désolés, mais la page que vous recherchez n'existe pas.</p>
          <router-link to="/" class="btn btn-primary error-page__button">Retour à la page d'accueil</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.error-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.error-page__title {
  font-size: 48px;
  margin-bottom: 20px;
}

.error-page__message {
  font-size: 24px;
  margin-bottom: 10px;
}

.error-page__description {
  font-size: 18px;
  margin-bottom: 20px;
}

.error-page__button {
  font-size: 18px;
}
</style>


<script>
export default {
  mounted() {
        document.title = 'Page d\'erreur';

  },
}
</script>