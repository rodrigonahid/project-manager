const express = require("express");
const routes = express.Router();
const ProfileController = require("./controllers/ProfileController");
const JobController = require("./controllers/JobController");
const DashboardController = require("./controllers/DashboardController");

routes.get("/", DashboardController.index);

routes.get("/project", JobController.create);

routes.post("/project", JobController.save);

routes.get("/project/:id", JobController.show);

routes.post("/project/:id", JobController.update);

routes.post("/project/delete/:id", JobController.delete);

routes.get("/profile", ProfileController.index);

routes.post("/profile", ProfileController.update);

module.exports = routes;
