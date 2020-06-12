const express = require('express');
const router = express.Router();
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config/dev')

router.get('/:usersId',  (req, res) => {
  const usersId = req.params.usersId
  Article.findById(usersId, function(err, foundUsers) {
    if(err) {
      return res.status(422).send(
        { errors: [{ title: 'Error', detail: 'User not found' }]}
      )
    }
    return res.json(foundUsers)
  })
})

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword } = req.body
  
  if(!username) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'ユーザー名を入力してください'}]})
  }
  if(!email) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'Emailを入力してください'}]})
  }
  if(!password) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'パスワードを入力してください'}]})
  }
  if(password !== confirmPassword) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'パスワードを確認してください'}]})
  }
  User.findOne({email}, function(err, foundUser) {
    if(err) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'エラー発生'}]})
    }
    if(foundUser) {
      return res.status(422).send({errors: [{title: 'user error', detail: '既にユーザーが存在します'}]})
    }
    const user = new User({ username, email, password })
    user.save(function(err) {
      if(err) {
        return res.status(422).send({errors: [{title: 'user error', detail: 'エラー発生'}]})
      }
      return res.json({ "registerd": true })
    })
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  if(!email) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'Emailを入力してください'}]})
  }
  if(!password) {
    return res.status(422).send({errors: [{title: 'user error', detail: 'パスワードを入力してください'}]})
  }
  User.findOne({email}, function(err, foundUser) {
    if(err) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'エラー発生'}]})
    }
    if(!foundUser) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'ユーザーが存在しません'}]})
    }
    if(!foundUser.hasSamePassword(password)) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'パスワードが正しくありません'}]})
    }
    const token = jwt.sign({
      userId: foundUser.id,
      username: foundUser.username
    }, config.SECRET, { expiresIn: '1h' })

    return res.json(token)
  })
})


module.exports = router