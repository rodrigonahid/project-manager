const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils");
const JobController = require("./JobController");

module.exports = {
  async index(req, res) {
    // Ajustes no projeto
    const jobs = await Job.get();
    const profile = await Profile.get();
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    };

    const updatedJobs = jobs.map((job) => {
      const remainingDays = JobUtils.remainingDays(job);
      const status = remainingDays <= 0 ? "done" : "progress";
      if (status === "done") {
        statusCount.done++;
      } else if (status === "progress") {
        statusCount.progress++;
      }
      return {
        ...job,
        remainingDays,
        status,
        budget: JobUtils.calculateBudget(job, profile.value_hour),
      };
    });
    let freeHours = profile.hours_per_day;

    updatedJobs.forEach((item) => {
      if (item.status === "progress") {
        freeHours -= item.daily_hours;
      }
    });

    return res.render("index", {
      jobs: updatedJobs,
      profile: profile,
      statusCount: statusCount,
      freeHours: freeHours,
    });
  },
};
