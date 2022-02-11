const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager", {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
});


const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
}

// const me = new User({
//   name: "Kushagra",
//   age: 21,
//   email: "giantkillerkushagra@gmail.com",
//   password: "123456789",
// });

// me.save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
