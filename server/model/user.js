const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: { 
    type: String, 
    required: true, 
    max:[30, 'ユーザー名は最大30文字です'] 
  },
  email: { 
    type: String, 
    required: true, 
    lowercase: true,
    unique: true,
    max:[30, 'Emailは最大60文字です'] 
  },
  password: { 
    type: String, 
    required: true, 
    max:[30, 'パスワードは最大30文字です。'], 
    min: [5, 'パスワードは最小5文字です。']
  },
  role: { type: String, required: true }
});

UserSchema.methods.hasSamePassword = function(inputPassword) {
  const user = this
  return bcrypt.compareSync(inputPassword, user.password)
}

UserSchema.pre('save', function(next) {
  const user = this
  const saltRounds = 10

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash
        next()
    })
  })
})

module.exports = mongoose.model('user', UserSchema)