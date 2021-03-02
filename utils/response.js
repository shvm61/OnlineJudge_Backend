module.exports.SUCCESS = (body) => {
  return {
    data: body,
    success: true,
  };
};

module.exports.FAILURE = (msg) => {
  return {
    success: false,
    error: msg,
  };
};
