data = [
  {
    id: 1,
    project_name: "Pizzaria Guloso",
    daily_hours: "14",
    total_hours: "12",
    created_at: Date.now(),
    budget: 4500,
    status: "done",
  },
  {
    id: 2,
    project_name: "Projeto UmDois",
    daily_hours: "6",
    total_hours: "80",
    created_at: Date.now(),
    budget: 4500,
    status: "progress",
  },
];
module.exports = {
  get() {
    return data;
  },
  update(newData) {
    data = newData;
  },
  delete(id) {
    data = data.filter((job) => Number(job.id) !== Number(id));
  },
};
