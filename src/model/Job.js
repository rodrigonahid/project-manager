data = [
  {
    id: 1,
    project_name: "Pizzaria Guloso",
    daily_hours: "14",
    total_hours: "12",
    created_at: Date.now(),
    budget: 4500,
    remaining: 3,
    status: "progress",
  },
  {
    id: 2,
    project_name: "Projeto UmDois",
    daily_hours: "6",
    total_hours: "80",
    created_at: Date.now(),
    budget: 4500,
    remaining: 3,
    status: "done",
  },
];
module.exports = {
  get() {
    return data;
  },
  delete(id) {
    data = data.filter((job) => Number(job.id) !== Number(id));
  },
};
