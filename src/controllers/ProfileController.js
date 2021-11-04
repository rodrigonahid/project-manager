const Profile = require("../model/Profile");

module.exports = {
  index(req, res) {
    res.render("profile", { profile: Profile.get() });
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
};
