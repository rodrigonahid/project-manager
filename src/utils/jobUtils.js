module.exports = {
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
};
