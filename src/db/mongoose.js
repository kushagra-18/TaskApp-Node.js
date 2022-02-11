const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager", {
  //   useNewUrlParser: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false,
});



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
