
var express = require('express');
var router = express.Router();
const ArticleImmobilier = require('../models/Article_Immobilier_Comptage_Model.js');


// Post request to create a new article immobilier
router.post('/addArticleImmobilier', async (req, res) => {
    try {
      const {
        dateAchat,
        periodeAmortissement,
        prixAchat,
        codeCompta,
        reference,
        designation,
        Emplacement,
        quantite1,
        createur1,
        quantite2,
        createur2,
        quantite3,
        createur3,
        statut,
        idSoc,
        codification,
        lienArticleInventaire,

        dateInsertion_DB
      } = req.body;

      const articleImmobilier = new ArticleImmobilier({
        dateAchat,
        periodeAmortissement,
        prixAchat,
        codeCompta,
        reference,
        designation,
        Emplacement,
        quantite1,
        createur1,
        quantite2,
        createur2,
        quantite3,
        createur3,
        statut,
        idSoc,
        codification,
        lienArticleInventaire,

        dateInsertion_DB
      });
  
      await articleImmobilier.save();


  
      console.log('New articleImmobilier added:', articleImmobilier);
  
      res.status(201).json({ message: 'New articleImmobilier added successfully' });
    } catch (error) {
      console.error('Error adding articleImmobilier:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });




    // GET all articles immobiliers
router.get('/AllArticlesImmobiliers', async (req, res) => {
    try {
      const articlesImmobiliers = await ArticleImmobilier.find();
      res.status(200).json(articlesImmobiliers);
    } catch (error) {
      console.error('Error retrieving articlesImmobiliers:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });





  
    // Retrieve articles immobiliers with the specified lienArticleInventaireImmobilier variable

router.get('/allArticlesImmobiliersByLienArticleInventaire/:lienArticleInventaire', async (req, res) => {
  try {
    const lienArticleInventaire = req.params.lienArticleInventaire;

    const articlesImmo = await ArticleImmobilier.find({ lienArticleInventaire });

    res.status(200).json(articlesImmo);
  } catch (error) {
    console.error('Error retrieving articles immo :', error);
    res.status(500).json({ error: 'Server error' });
  }
});







// PUT request to update article's status and verified quantities
router.put('/updateWrongArticleImmobilierComptage/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const { statut, quantite1, quantite2, quantite3 } = req.body;

    const articleImmo = await ArticleImmobilier.findByIdAndUpdate(articleId, {
      statut:5,
      quantite1,
      quantite2,
      quantite3
    }, { new: true });

    if (!articleImmo) {
      return res.status(404).json({ error: 'ArarticleImmoticle not found' });
    }

    res.status(200).json({ message: 'articleImmo updated successfully', articleImmo });
  } catch (error) {
    console.error('Error updating articleImmo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});







  module.exports = router;