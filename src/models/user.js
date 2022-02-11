const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number },
  password: { type: String, required: true, trim: true },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,

    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  token: [
    {
      token: {
        type: String,
        rquired: true,
      },
    },
  ],
});

/**
 * @description - This function is used to create or verify jwt token
 */

userSchema.methods.generateAuthTokens = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "abc");

  user.token = user.token.concat({ token });

  await user.save();

  return token;
};

//find by credentials function

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to Login!");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login!");
  }

  return user;
};
//using the middleware to hash the password

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

//exporting the model

module.exports = User;
