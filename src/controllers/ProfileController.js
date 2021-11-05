const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    res.render("profile", { profile: Profile.get() });
  },
  update(req, res) {
    console.log(req.body);
    const data = {
      name: req.body.name,
      avatar: req.body.avatar,
      monthly_budget: req.body["monthly-budget"],
      days_per_week: req.body["days-per-week"],
      hours_per_day: req.body["hours-per-day"],
      vacation_per_year: req.body["vacation-per-year"],
    };
    const weeksPerYear = 52;
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"];

    const monthlyTotalHours = weekTotalHours * weeksPerMonth;

    const valueHour = data["monthly-budget"] / monthlyTotalHours;

    Profile.update({
      ...Profile.get(),
      ...data,
      value_hour: valueHour,
    });

    return res.redirect("/profile");
  },
};
