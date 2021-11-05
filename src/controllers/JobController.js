const Job = require("../model/Job");
const profile = require("../model/Profile");
const JobUtils = require("../utils/jobUtils");

module.exports = {
  index(req, res) {
    // Ajustes no projeto
    const Jobs = Job.get();
    const Profile = profile.get();

    const updatedJobs = Jobs.map((job) => {
      const remainingDays = JobUtils.remainingDays(job);
      const status = job.remainingDays <= 0 ? "done" : "progress";
      return {
        ...job,
        remainingDays,
        status,
        budget: JobUtils.calculateBudget(job, Profile.value_hour),
      };
    });

    return res.render("index", { updatedJobs });
  },
  create(req, res) {
    return res.render("project");
  },
  save(req, res) {
    const Jobs = Job.get();

    const job = req.body;
    const lastId = Jobs[Jobs.length - 1]?.id || 1;
    Jobs.created_at = Date.now();
    Jobs.push({
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
    const job = Jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Project not found");
    }
    job.budget = JobUtils.calculateBudget(job, Profile.data.value_hour);

    return res.render("project-edit", { job });
  },
  update(req, res) {
    const jobId = req.params.id;
    const job = Jobs.find((job) => Number(job.id) === Number(jobId));

    if (!job) {
      return res.send("Project not found");
    }

    const updatedJob = {
      ...job,
      project_name: req.body["project-name"],
      total_hours: req.body["project-valuation"],
      daily_hours: req.body["daily-hours"],
    };

    Jobs = Jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }
      return job;
    });
    res.redirect("/project/" + jobId);
  },
  delete(req, res) {
    const jobId = req.params.id;
    console.log(req.param.id);
    Jobs = Jobs.filter((job) => Number(job.id) !== Number(jobId));

    return res.redirect("/");
  },
};
