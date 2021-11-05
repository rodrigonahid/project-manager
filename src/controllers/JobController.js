module.exports = {
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

    return res.render("index", { updatedJobs });
  },
  create(req, res) {
    return res.render("project");
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

    return res.render("project-edit", { job });
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
  delete(req, res) {
    const jobId = req.params.id;
    console.log(req.param.id);
    Job.data = Job.data.filter((job) => Number(job.id) !== Number(jobId));

    return res.redirect("/");
  },
};
