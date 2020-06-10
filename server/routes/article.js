const express = require('express');
const router = express.Router();
const Article = require('../model/article')
const UserCtrl = require('../controllers/user')

router.get('', (req, res) => {
  Article.find({}, function(err, foundArticle) {
    return res.json(foundArticle)
  })
})

router.get('/secret', UserCtrl.authMiddleware, (req, res) => {
  return res.json({"secret": true})
})

router.get('/:articleId', UserCtrl.authMiddleware, (req, res) => {
  const articleId = req.params.articleId
  Article.findById(articleId, function(err, foundArticle) {
    if(err) {
      return res.status(422).send(
        { errors: [{ title: 'Error', detail: 'Article not found' }]}
      )
    }
    return res.json(foundArticle)
  })
})

router.post('', (req, res) => {
  const ArticlePost = new Article()
  
  ArticlePost.title = req.body.title
  ArticlePost.text = req.body.text
  ArticlePost.created = req.body.created

  ArticlePost.save(function(err) {
    if(err) {
      res.send(err)
    } else {
      res.json({ articlepost: 'success' })
    }
  })
})

router.delete('/:articleId', (req, res) => {
  const articleId = req.params.articleId
  Article.deleteOne({_id:articleId})
    .then(function() {
      res.json({ delete: 'success' })
    })
})

module.exports = router