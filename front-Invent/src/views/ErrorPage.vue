<template>
  <div class="error-page">
    <div class="container">
      <div class="row">
        <div class=" offset-md-3 text-center">
          <h1 class="error-page__title">Oops!</h1>
          <p class="error-page__message">Une erreur s'est produite.</p>
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
  font-size: 72px;
  color: #e74c3c;
  margin-bottom: 10px;
}

.error-page__message {
  font-size: 24px;
  color: #333;
  margin-bottom: 5px;
}

.error-page__description {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.error-page__button {
  font-size: 18px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.error-page__button:hover {
  background-color: #da786d;
}
</style>
