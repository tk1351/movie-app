const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('./config/')
const mongoose = require('mongoose')

const articleRoutes = require('./routes/article')
const usersRoutes = require('./routes/users')
const searchRoutes = require('./routes/search')
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB connection')
});

app.use('/api/v1/article', articleRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/search', searchRoutes)

//if(process.env.NODE_ENV === 'prod'){
  const appPath = path.join(__dirname,'..','dist','movie-app')
  app.use(express.static(appPath))
  app.get('*', function(req,res){
    res.sendFile(path.resolve(appPath, 'index.html'))
})
//}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log('I am running'))