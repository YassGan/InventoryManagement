
var express = require('express');
var router = express.Router();
const Article = require('../models/Article_Comptage_Model.js');


// Post request to create a new article
router.post('/addArticle', async (req, res) => {
    try {
      const {
        reference,
        designation,
        lot,
        dateFabrication,
        datePeremption,
        Emplacement,
        quantite1,
        createur1,
        quantite2,
        createur2,
        quantite3,
        createur3,
        statut,
        idSoc,
        lienArticleInventaire,

        dateInsertion_DB
      } = req.body;
  
      const article = new Article({
        reference,
        designation,
        lot,
        dateFabrication,
        datePeremption,
        Emplacement,
        quantite1,
        createur1,
        quantite2,
        createur2,
        quantite3,
        createur3,
        statut,
        idSoc,
        lienArticleInventaire,

        dateInsertion_DB
      });
  
      await article.save();
  
      console.log('New article added:', article);
  
      res.status(201).json({ message: 'New article added successfully' });
    } catch (error) {
      console.error('Error adding article:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });



  // GET all articles
router.get('/AllArticles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error retrieving articles:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




    // Retrieve articles with the specified lienArticleInventaire variable

router.get('/allArticlesByLienArticleInventaire/:lienArticleInventaire', async (req, res) => {
  try {
    const lienArticleInventaire = req.params.lienArticleInventaire;

    const articles = await Article.find({ lienArticleInventaire });

    res.status(200).json(articles);
  } catch (error) {
    console.error('Error retrieving articles:', error);
    res.status(500).json({ error: 'Server error' });
  }
});





// PUT request to update article's status and verified quantities
router.put('/updateWrongArticleComptage/:articleId', async (req, res) => {
  try {
    const { articleId } = req.params;
    const { statut, quantite1, quantite2, quantite3 } = req.body;

    const article = await Article.findByIdAndUpdate(articleId, {
      statut:5,
      quantite1,
      quantite2,
      quantite3
    }, { new: true });

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json({ message: 'Article updated successfully', article });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'Server error' });
  }
});





  

  module.exports = router;