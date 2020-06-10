const jwt = require('jsonwebtoken')
const config = require('../config/dev')
const User = require('../model/user')

function notAuthorized(res) {
  return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'ログインする必要があります'}]})
}

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization

  if(!token) {
    return notAuthorized(res)
  }
  jwt.verify(token.split(' ')[1], config.SECRET, function(err, decodedToken) {
    if(err) {
      return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'Tokenが不適切です'}]})
    }
    User.findById(decodedToken.userId, function(err, foundUser) {
      if(err) {
        return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'Tokenが不適切です'}]})
      }
      if(!foundUser) {
        return res.status(401).send({errors: [{title: 'Not Authorized', detail: 'ユーザーが見つかりません'}]})
      }
      next()
    })
  })

}