exports.someMiddleware = (req, res, next) => {
  res.locals.someVariable = "valor local em toda rota";
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err && "EBADCSRFTOKEN" === err.code) {
    return res.render("404");
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
