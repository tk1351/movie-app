const express = require('express')
const router = express.Router()
const Article = require('../model/article')

router.get('', (req, res) => {
  res.json({ message: 'success' })
})

router.post('/articleSearch', (req, res) => {
  const { queryParam } = req.body

  if(!queryParam) {
    Article.find({}, function(err, foundArticle) {
      if(err) {
        return res.status(422).send({errors: [{title: 'search error', detail: 'エラー発生'}]})
      }
      if(!foundArticle) {
        return res.status(422).send({errors: [{title: 'search error', detail: '記事が存在しません'}]})
      }
      return res.json(foundArticle)
    })
  } else {
    Article.find({$or:[
      {title: new RegExp( ".*"+queryParam+".*")},
      {text: new RegExp( ".*"+queryParam+".*")},
      ]}, function(err, foundArticle) {
      if(err) {
        return res.status(422).send({errors: [{title: 'search error', detail: 'エラー発生'}]})
      }
      if(!foundArticle) {
        return res.status(422).send({errors: [{title: 'search error', detail: '記事が存在しません'}]})
      }
      return res.json(foundArticle)
    })
  }
})


module.exports = router