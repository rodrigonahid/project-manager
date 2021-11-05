let data = {
  name: "Rodrigo Nahid",
  avatar: "https://github.com/rodrigonahid.png",
  monthly_budget: 3000,
  days_per_week: 5,
  hours_per_day: 6,
  vacation_per_year: 4,
  value_hour: 60,
};

module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
};
