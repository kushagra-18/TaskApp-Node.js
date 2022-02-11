const express = require("express");
const { model } = require("mongoose");
const Task = require("../models/task");
const {validateHelper} = require("../utils/helpers");

const router = new express.Router();

  /**
   * @desciption - This route is used to create a new task
   * @param {string} req.body.description - The description of the task
   * @param {string} req.body.completed - The completed status of the task
   * @returns {object} - Returns the task object
   */
  
  router.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
  
    try {
      await task.save();
      res.status(200).send(task);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  /**
   * @description - This route is used to get all the tasks
   * @returns {object} - Returns the task object
   */
  
  router.get("/tasks", async (req, res) => {

    try {
      const task = await Task.find({});
      res.status(200).send(task);
    } catch {
      res.status(500).send();
    }
  });
  
  /**
   * @description - This route is used to get  the task by id
   * @param {string} req.params.id - The id of the task
   * @returns {object} - Returns the task object
   */
  
  router.get("/tasks/:id", (req, res) => {
    Task.findById(req.params.id)
      .then((task) => {
        if (task === null) {
          return res.status(404).send();
        }
        res.status(200).send(task);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  });
  
  /**
   * @description - This route is used to update the task by id
   * @param {string} req.params.id - The id of the task
   * @param {string} req.body.description - The description of the task
   * @param {string} req.body.completed - The completed status of the task
   * @returns {object} - Returns the task object
   * @throws {object} - Returns an error object
   */
  
  router.patch("/tasks/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
  
    validateHelper(res, updates, allowedUpdates);
  
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!task) {
        return res.status(404).send();
      }
  
      res.send(task);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  
  module.exports = router;