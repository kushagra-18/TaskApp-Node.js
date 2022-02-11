const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
    name: { type: String, required: true, trim: true },
    age: { type: Number },
    password: { type: String, required: true, trim: true },
    email: {
      type: String,
  
      required: true,
      trim: true,
  
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
  });

  //exporting the model

module.exports = User;