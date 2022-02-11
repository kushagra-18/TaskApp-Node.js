const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
 
    description: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
  });

  //exporting the model

module.exports = Task;