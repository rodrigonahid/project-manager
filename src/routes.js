const express = require('express');
const routes = express.Router();

const basePath = __dirname + '/views'

routes.get('/',(req, res) => {
  return res.sendFile(`${basePath}/index.html`)
})

routes.get('/index.html', (req, res)=>{
  return res.redirect('/')
})

routes.get('/project',(req, res) => {
  return res.sendFile(`${basePath}/project.html`)
})

routes.get('/project/edit',(req, res) => {
  return res.sendFile(`${basePath}/project.html`)
})

routes.get('/profile',(req, res) => {
  return res.sendFile(`${basePath}/profile.html`)
})

module.exports = routes;