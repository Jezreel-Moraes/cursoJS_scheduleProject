module.exports.get = (req, res, next) => {
  res.render("form");
  next();
};

module.exports.post = (req, res, next) => {
  res.send(req.body);
  next();
};
