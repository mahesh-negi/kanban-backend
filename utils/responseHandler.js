const handleError = (res, { message, statusCode = 400 }) => {
  res.status(statusCode).json({ error: message });
};

const handleSuccess = (res, { message, data, statusCode = 200 }) => {
  res.status(statusCode).json({ message, data });
};

module.exports = { handleError, handleSuccess };
