const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");

module.exports = {
  create(req, res) {
    return res.render("project");
  },
  save(req, res) {
    const jobs = Job.get();

    const job = req.body;
    const lastId = jobs[jobs.length - 1]?.id || 1;
    jobs.created_at = Date.now();
    jobs.push({
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
    const jobs = Job.get();
    const jobId = req.params.id;
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Project not found");
    }
    const profile = Profile.get();

    job.budget = JobUtils.calculateBudget(job, profile.value_hour);

    return res.render("project-edit", { job });
  },
  update(req, res) {
    const jobId = req.params.id;
    const jobs = Job.get();
    const job = jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Project not found");
    }

    const updatedJob = {
      ...job,
      project_name: req.body["project-name"],
      total_hours: req.body["project-valuation"],
      daily_hours: req.body["daily-hours"],
    };

    const newJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }
      return job;
    });

    Job.update(newJobs);

    res.redirect("/");
  },
  delete(req, res) {
    const jobId = req.params.id;
    Job.delete(jobId);

    return res.redirect("/");
  },
};
