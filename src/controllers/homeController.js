module.exports = (req, res, next) => {
  // req.session.user = {name: 'Jezreel', online: true};
  // req.flash("ass", "sao");
  // console.log(req.flash("info"), req.flash("ass"));
  res.locals.homeGetVariable = "Oi, sou uma variável da pagina";
  res.render("index");
  // console.log(req.session.user);
};
