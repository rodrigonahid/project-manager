const express = require("express");
const routes = express.Router();

const views = __dirname + "/views/";

const Profile = {
  data: {
    name: "Rodrigo Nahid",
    avatar: "https://github.com/rodrigonahid.png",
    monthly_budget: 3000,
    days_per_week: 5,
    hours_per_day: 6,
    vacation_per_year: 4,
    value_hour: 60,
  },
  controllers: {
    index(req, res) {
      res.render(views + "profile", { profile: Profile.data });
    },
    update() {
      const data = req.body;
      const weeksPerYear = 52;
      const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
      const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

      const monthlyTotalHours = weekTotalHours * weeksPerMonth;

      data["value-hour"] = data["monthly-budget"] / monthlyTotalHours;

      Profile.data = {
        ...Profile.data,
        ...req.body,
        value_hour: valueHour,
      };

      return res.redirect("/profile");
    },
  },
};

const Job = {
  data: [
    {
      id: 1,
      project_name: "Pizzaria Guloso",
      daily_hours: "14",
      total_hours: "12",
      created_at: Date.now(),
      budget: 4500,
      remaining: 3,
      status: "progress",
    },
    {
      id: 2,
      project_name: "Projeto UmDois",
      daily_hours: "6",
      total_hours: "80",
      created_at: Date.now(),
      budget: 4500,
      remaining: 3,
      status: "done",
    },
  ],
  controllers: {
    index(req, res) {
      // Ajustes no projeto
      const updatedJobs = Job.data.map((job) => {
        const remainingDays = Job.services.remainingDays(job);
        const status = job.remainingDays <= 0 ? "done" : "progress";
        return {
          ...job,
          remainingDays,
          status,
          budget: Job.services.calculateBudget(job, Profile.data.value_hour),
        };
      });

      return res.render(views + "index", { updatedJobs });
    },
    create(req, res) {
      return res.render(views + "project");
    },
    save(req, res) {
      const job = req.body;
      const lastId = Job.data[Job.data.length - 1]?.id || 1;
      Job.data.created_at = Date.now();
      Job.data.push({
        id: lastId + 1,
        project_name: job["project-name"],
        daily_hours: job["daily-hours"],
        total_hours: job["project-valuation"],
        created_at: Date.now(),
        budget: 100,
      });
      return res.redirect("/");
    },
    show(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return res.send("Project not found");
      }
      job.budget = Job.services.calculateBudget(job, Profile.data.value_hour);

      return res.render(views + "project-edit", { job });
    },
    update(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find((job) => Number(job.id) === Number(jobId));

      if (!job) {
        return res.send("Project not found");
      }

      const updatedJob = {
        ...job,
        project_name: req.body["project-name"],
        total_hours: req.body["project-valuation"],
        daily_hours: req.body["daily-hours"],
      };

      Job.data = Job.data.map((job) => {
        if (Number(job.id) === Number(jobId)) {
          job = updatedJob;
        }
        return job;
      });
      res.redirect("/project/" + jobId);
    },
  },
  services: {
    remainingDays(job) {
      const remainingDays = (job.total_hours / job.daily_hours).toFixed();
      const createdDate = new Date(job.created_at);

      const deadline = createdDate.getDate() + Number(remainingDays);

      const deadlineTime = createdDate.setDate(deadline);

      const timeDiffInMs = deadlineTime - Date.now();
      // Transformar ms em days
      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiffInMs / dayInMs);
      return dayDiff;
    },
    calculateBudget(job, valueHour) {
      return valueHour * job.total_hours;
    },
  },
};

routes.get("/", Job.controllers.index);

routes.get("/project", Job.controllers.create);

routes.post("/project", Job.controllers.save);

routes.get("/project/:id", Job.controllers.show);

routes.post("/project/:id", Job.controllers.update);

routes.get("/profile", Profile.controllers.index);

module.exports = routes;
