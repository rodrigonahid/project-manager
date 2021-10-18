const express = require('express');
const routes = express.Router();

const views = __dirname + '/views/';

const profile = {
  name: "Rodrigo Nahid",
  avatar: "https://github.com/rodrigonahid.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 6,
  "vacation-per-year": 4
}

const project = []

routes.get('/', (req, res) => res.render(views + 'index'))

routes.get('/project', (req, res) => res.render(views + 'project'))
routes.post('/project', (req, res) => {
  const job = req.body;
  const id = project.length
  job.created_at = Date.now()
  console.log(job)
  project.push({
    "project-name": job["project-name"],
    "daily-hours": job["daily-hours"],
    "total-hours": job["project-valuation"],
    created_at: Date.now(),
  });
  return res.redirect('/')
})

routes.get('/project/edit', (req, res) =>  res.render(views + 'project'))

routes.get('/profile', (req, res) =>  res.render(views + 'profile', {profile: profile}))

module.exports = routes;