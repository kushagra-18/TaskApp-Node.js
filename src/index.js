const express = require("express");

require("./db/mongoose");

const Task = require("./models/task");

const userRouter = require("./routers/userRouter");

const taskRouter = require("./routers/taskRouter");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);



// ----------------------PORT LISTEN----------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
