const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { responseHandler } = require("../utils");
const { requestHandler } = require("../utils");
const { RESPONSE_MESSAGE } = require("../constants/responseMessage");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    await requestHandler.validateRequest(req.body, schema);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return responseHandler.handleError(res, {
        message: RESPONSE_MESSAGE.EMAIL_ALREADY_EXISTS,
        statusCode: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();

    return responseHandler.handleSuccess(res, {
      message: RESPONSE_MESSAGE.REGISTRATION_IS_SUCCESSFULLY,
      data: user,
    });
  } catch (error) {
    return responseHandler.handleError(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    });

    await requestHandler.validateRequest(req.body, schema);

    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return responseHandler.handleError(res, {
        message: RESPONSE_MESSAGE.INVALID_CREDENTIALS,
        statusCode: 400,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return responseHandler.handleSuccess(res, {
      message: RESPONSE_MESSAGE.LOGIN_SUCCESSFULLY,
      data: { token },
    });
  } catch (error) {
    return responseHandler.handleError(res, error);
  }
};
