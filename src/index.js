const express = require("express");

require("./db/mongoose");

const User = require("./models/user");

const Task = require("./models/task");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

//-----------------------------ROUTES START---------------------------------//

/**
 * @description - This route is used to create a new user
 * @param {string} req.body.name - The name of the user
 * @param {string} req.body.email - The email of the user
 * @param {string} req.body.password - The password of the user
 * @returns {object} - Returns the user object
 * @throws {object} - Returns an error object
 */

app.post("/users", (req, res) => {
  console.log(req.body);
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(200).send(user);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

/**
 * @desciption - This route is used to create a new task
 * @param {string} req.body.description - The description of the task
 * @param {string} req.body.completed - The completed status of the task
 * @returns {object} - Returns the task object
 */

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);

  task
    .save()
    .then(() => {
      res.status(200).send(task);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

/**
 * @description - This route is used to get all the users
 * @returns {object} - Returns the user object
 * @throws {object} - Returns an error object
 */

app.get("/users", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

/**
 * @description - This route is used to get  the user by id
 * @param {string} req.params.id - The id of the user
 */

app.get("/users/:id", (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
        console.log("user",user);
      if (user === null) {
        return res.status(404).send();
      } 
        res.status(200).send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

/**
 * @description - This route is used to get all the tasks
 * @returns {object} - Returns the task object
 */

app.get("/tasks", (req, res) => {
    Task.find()
    .then((tasks) => {
        res.status(200).send(tasks);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
});











// ----------------------PORT LISTEN----------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
