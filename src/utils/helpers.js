
const jwt = require('jsonwebtoken');

/**
 * @description - Helper function to validate if the options
 * are allowed to be updated or not
 * @param {object} res - The response object
 */

const validateHelper = (res, updates, allowedUpdates) => {
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });
  
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
  };

module.exports = { validateHelper };