const express = require('express');
const router = express.Router();
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const config = require('../config/')

router.get('', (req, res) => {
  User.find({}, function(err, foundUser) {
    return res.json(foundUser)
  })
})

router.get('/:userId', (req, res) => {
  const userId = req.params.userId
  User.findById(userId, function(err, foundUser) {
    if(err) {
      return res.status(422).send(
        { errors: [{ title: 'Error', detail: 'User not found' }]}
      )
    }
    return res.json(foundUser)
  })
})

router.delete('/:userId', (req, res) => {
  const userId = req.params.userId
  User.deleteOne({_id:userId})
    .then(function() {
      res.json({ delete: 'success' })
    })
})

//Emailが一致する場合×
router.put('/userInfo/:userId', (req, res) => {
  const userId = req.params.userId
  User.findById(userId, function(err, foundUser) {
    if(err) {
      res.send(err)
    } else {
      foundUser.username = req.body.username
      foundUser.email = req.body.email

      foundUser.save(function(err) {
        if(err) {
          res.send(err)
        } else {
          res.json({ update: 'success' })
        }
      })
    }
  })
})

router.put('/password/:userId', (req, res) => {
  const { password, newPassword, confirmNewPassword } = req.body
  const userId = req.params.userId

  if(!password) {
    return res.status(422).send({errors: [{title: 'password error', detail: '現在のパスワードを入力してください'}]})
  }
  if(!newPassword) {
    return res.status(422).send({errors: [{title: 'password error', detail: '新しいパスワードを入力してください'}]})
  }
  if(!confirmNewPassword) {
    return res.status(422).send({errors: [{title: 'password error', detail: '確認用パスワードを入力してください'}]})
  }
  if(newPassword !== confirmNewPassword) {
    return res.status(422).send({errors: [{title: 'password error', detail: 'パスワードを確認してください'}]})
  }
  User.findOne({_id: userId}, function(err, foundUser) {
    if(err) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'エラー発生'}]})
    }
    if(!foundUser.hasSamePassword(password)) {
      return res.status(422).send({errors: [{title: 'user error', detail: 'パスワードが存在しません'}]})
    } else {
      foundUser.password = newPassword
  
      foundUser.save(function(err) {
        if(err) {
          res.send(err)
        } else {
          res.json({ update: 'success' })
        }
      })
    }
  })
  

})

router.post('/register', (req, res) => {
  const { username, email, password, confirmPassword, role } = req.body
  
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
    const user = new User({ username, email, password, role })
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
      username: foundUser.username,
      role: foundUser.role
    }, config.SECRET, { expiresIn: '1h' })

    return res.json(token)
  })
})


module.exports = router