const express = require("express");
const User = require("../models/user");
const {validateHelper} = require("../utils/helpers");

const router = new express.Router();
/**
 * @description - This route is used to create a new user
 * @param {string} req.body.name - The name of the user
 * @param {string} req.body.email - The email of the user
 * @param {string} req.body.password - The password of the user
 * @returns {object} - Returns the user object along with the status code
 * @throws {object} - Returns an error object
 */

 router.post("/users", async (req, res) => {

    const user = new User(req.body);
  
    try {
      await user.save();
      res.status(200).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  });
  
  /**
   * @description - This route is used to get all the users
   * @returns {object} - Returns the user object
   * @throws {object} - Returns an error object
   */
  
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).send(users);
    } catch {
      res.status(500).send();
    }
  });
  
  /**
   * @description - This route is used to get  the user by id
   * @param {string} req.params.id - The id of the user
   */
  
  router.get("/users/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).send();
      }
    } catch (error) {
      res.status(500).send();
    }
  });
  
  /**
   * @description - This route is used to update the user by id
   * @param {string} req.params.id - The id of the user
   * @param {string} req.body.name - The name of the user
   * @param {string} req.body.email - The email of the user
   * @param {string} req.body.password - The password of the user
   * @returns {object} - Returns the user object along with the status code
   */
  
  router.patch("/users/:id", async (req, res) => {
    const allowedUpdates = ["name", "email", "password", "age"];
    const updates = Object.keys(req.body);
  
    validateHelper(res, updates, allowedUpdates);
  
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
  
      if (!user) {
        return res.status(404).send();
      }
  
      res.send(user);
    } catch (error) {
      return res.status(500).send(error);
    }
  });

    /**
   * @description - This route is used to delete the task by id
   * @param {string} req.params.id - The id of the task
   * @returns {object} - Returns the task object
   */
  
     router.delete("/users/:id", async (req, res) => {
        try {
          const user = await User.findByIdAndDelete(req.params.id);
          
          if (!user) {
            return res.status(404).send();
          }
      
          return res.status(200).send(user);
          
        } catch (error) {
          return res.status(500).send(error);
        }
      });
      

module.exports = router;