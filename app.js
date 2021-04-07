const express = require("express");
const app = express();
const fs = require("fs");

let tasksDb = [];

fs.readFile("./data/tasks.json", (err, data) => {
  if (!err) {
    tasksDb = JSON.parse(data);
  }
});

const parser = require("body-parser");

app.use(parser.urlencoded({ extended: true }));

app.use("/assets", express.static("./public"));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/tasks/create", (req, res) => {
  res.render("create", { show: req.query.success });
});

function generateRandomId() {
  return Math.floor(Math.random() * 99999) + 1;
}

app.post("/tasks/create", (req, res) => {
  // get the sent data
  const task = {
    id: generateRandomId(),
    title: req.body.title,
    body: req.body.details,
  };

  // store it
  tasksDb.push(task);
  fs.writeFile("./data/tasks.json", JSON.stringify(tasksDb), (err) => {
    if (err) {
      res.redirect("/tasks/create?success=0");
    } else {
      res.redirect("/tasks/create?success=1");
    }
  });
});
app.get("/tasks", (req, res) => {
  res.render("tasks", { tasks: tasksDb });
});

app.get("/task/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = task.find((task) => task.id === id);

  res.render("task", { task: task });
});

app.get("/tasks/:id/delete", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasksDb.findIndex((task) => task.id === id);

  // Delete from tasksDB array
  tasksDb.splice(index, 1);

  // Update tasks.json file
  fs.writeFile("./data/tasks.json", JSON.stringify(tasksDb), (err) => {
    if (err) {
      res.redirect("/tasks?success=0");
    } else {
      res.redirect("/tasks?success=1");
    }
  });
});

app.get('/tasks/detail', (req, res) => {
    res.render('detail')
})
app.get('/tasks/signup', (req, res) => {
  res.render('signup')
})
app.get('/tasks/login', (req, res) => {
  res.render('login')
})
app.listen(7702, () => console.log("App is running..."));
