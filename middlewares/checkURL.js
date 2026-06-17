function checkTypeOfParams(req, res, next) {
  console.log("checking params and query");
  next();
}
module.exports = { checkTypeOfParams };
