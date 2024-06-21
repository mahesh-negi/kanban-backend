const Joi = require("joi");

const sendBadRequestError = (error) => {
  let message = error.details[0].message;
  message = message.replace(/"/g, "");
  message = message.replace("[", "");
  message = message.replace("]", "");
  return message;
};

const validateRequest = async (data, schema) => {
  return new Promise((resolve, reject) => {
    const { error } = schema.validate(data);
    if (error) {
      let message = sendBadRequestError(error);
      reject(new Error(message));
    } else {
      return resolve(true);
    }
  });
};

module.exports = { validateRequest, sendBadRequestError };
