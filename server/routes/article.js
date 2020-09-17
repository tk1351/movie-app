const express = require("express");
const router = express.Router();
const Article = require("../model/article");
const UserCtrl = require("../controllers/user");

// router.get('', (req, res) => {
//   Article.find({}, function(err, foundArticle) {
//     return res.json(foundArticle)
//   })
// })

router.get("", (req, res) => {
  Article.find(
    {},
    ["title", "created", "uid"],
    { sort: { created: 1 } },
    function (err, foundArticle) {
      return res.json(foundArticle);
    }
  );
});

router.get("/:articleId", (req, res) => {
  const articleId = req.params.articleId;
  Article.findById(articleId, function (err, foundArticle) {
    if (err) {
      return res
        .status(422)
        .send({ errors: [{ title: "Error", detail: "Article not found" }] });
    }
    return res.json(foundArticle);
  });
});

router.post("", UserCtrl.authMiddleware, (req, res) => {
  const ArticlePost = new Article();

  ArticlePost.title = req.body.title;
  ArticlePost.text = req.body.text;
  ArticlePost.created = req.body.created;
  ArticlePost.uid = req.body.uid;

  ArticlePost.save(function (err) {
    if (err) {
      res.send(err);
    } else {
      res.json({ articlepost: "success" });
    }
  });
});

router.delete("/:articleId", UserCtrl.authMiddleware, (req, res) => {
  const articleId = req.params.articleId;
  Article.deleteOne({ _id: articleId }).then(function () {
    res.json({ delete: "success" });
  });
});

router.put("/:articleId", UserCtrl.authMiddleware, (req, res) => {
  const articleId = req.params.articleId;
  Article.findById(articleId, function (err, foundArticle) {
    if (err) {
      res.send(err);
    } else {
      foundArticle.title = req.body.title;
      foundArticle.text = req.body.text;

      foundArticle.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.json({ update: "success" });
        }
      });
    }
  });
});

module.exports = router;
