const express = require("express");

require("./db/mongoose");

const Task = require("./models/task");

const userRouter = require("./routers/userRouter");

const taskRouter = require("./routers/taskRouter");

const bycript = require("bcryptjs");

// -----------APP CONFIGURATION-----------------

const app = express();


// //----Middleware----

// app.use((req, res, next) => {
  
//   console.log(req.method, req.path);
  
//   next();
// });


const port = process.env.PORT || 5000;

app.use(express.json());

app.use(userRouter);

app.use(taskRouter);


// ----------------------PORT LISTEN----------------------------
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
