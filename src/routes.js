const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const profile = {
  name: "Rodrigo Nahid",
  avatar: "https://github.com/rodrigonahid.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 6,
  "vacation-per-year": 4,
};

const project = [
  {
    id: 1,
    project_name: "Pizzaria Guloso",
    daily_hours: "2",
    total_hours: "60",
    created_at: Date.now(),
  },
  {
    id: 2,
    project_name: "Projeto UmDois",
    daily_hours: "6",
    total_hours: "80",
    created_at: Date.now(),
  },
];

routes.get("/", (req, res) => res.render(views + "index", { project }));

routes.get("/project", (req, res) => res.render(views + "project"));
routes.post("/project", (req, res) => {
  const job = req.body;
  const lastId = project[project.length - 1]?.id || 1;
  project.created_at = Date.now();
  console.log(job);
  project.push({
    id: lastId + 1,
    project_name: job["project-name"],
    daily_hours: job["daily-hours"],
    total_hours: job["project-valuation"],
    created_at: Date.now(),
  });
  return res.redirect("/");
});

routes.get("/project/edit", (req, res) => res.render(views + "project"));

routes.get("/profile", (req, res) =>
  res.render(views + "profile", { profile: profile })
);

module.exports = routes;
