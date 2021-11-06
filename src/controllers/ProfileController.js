const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    res.render("profile", { profile: Profile.get() });
  },
  update(req, res) {
    const profile = Profile.get();
    const data = {
      name: req.body.name,
      avatar: req.body.avatar,
      monthly_budget: req.body["monthly-budget"],
      days_per_week: req.body["days-per-week"],
      hours_per_day: req.body["hours-per-day"],
      vacation_per_year: req.body["vacation-per-year"],
    };
    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data.vacation_per_year) / 12;
    const weekTotalHours = data.hours_per_day * data.days_per_week;

    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    const valueHour = data.monthly_budget / monthlyTotalHours;

    const newProfile = {
      ...profile,
      ...data,
      value_hour: valueHour,
    };
    Profile.update(newProfile);
    return res.redirect("/");
  },
};
