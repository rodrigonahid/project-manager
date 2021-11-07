const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  create(req, res) {
    return res.render("project");
  },
  async save(req, res) {
    const jobs = await Job.get();

    const job = req.body;
    await Job.create({
      name: job["project-name"],
      daily_hours: job["daily-hours"],
      total_hours: job["project-valuation"],
      created_at: Date.now(),
    });
    return res.redirect("/");
  },
  async show(req, res) {
    const jobs = await Job.get();
    const jobId = req.params.id;
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Project not found");
    }
    const profile = Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile.value_hour);
    console.log(job);
    return res.render("project-edit", { job });
  },
  async update(req, res) {
    const jobId = req.params.id;

    const updatedJob = {
      name: req.body["project-name"],
      total_hours: req.body["project-valuation"],
      daily_hours: req.body["daily-hours"],
    };

    await Job.update(updatedJob, jobId);

    res.redirect("/");
  },
  delete(req, res) {
    const jobId = req.params.id;
    Job.delete(jobId);

    return res.redirect("/");
  },
};
