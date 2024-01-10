const express = require("express");
// use json data as database
const tasks = require('./task')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("To do list App");
});
// list all task
app.get('/tasks', (req, res) => {
  res.json(tasks);
});
// add task
app.post('/tasks', (req, res) => {
  tasks.push(req.body);
  let json = req.body;
  res.send(`Add new task '${json.taskname}' completed.`);
});

app.put('/tasks/complete/:id', (req, res) => {
  const updateIndex = tasks.findIndex(task => task.id === Number(req.params.id));
  tasks[updateIndex].status = 1;
  res.send(`Update task : '${tasks[updateIndex].taskname}' completed.`);
});

app.put('/tasks/:id', (req, res) => {
  const updateIndex = tasks.findIndex(task => task.id === Number(req.params.id));
  tasks[updateIndex].taskname = req.body.taskname;
  res.send(`Update task : '${tasks[updateIndex].taskname}' completed.`);
})

app.put('/tasks/:id', (req, res) => {
  const updateIndex = tasks.findIndex(task => task.id === Number(req.params.id));
  tasks.splice(updateIndex, 1);
  res.send(`Delete task : '${req.params.id}' completed.`);
})

app.listen(port, () => {
  console.log("Starting node.js at port " + port);
});