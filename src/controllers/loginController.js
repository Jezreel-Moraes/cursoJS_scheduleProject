const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  if (req.session.user) return res.redirect("/");
  res.render("login");
};

exports.register = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
    req.flash("success", "Usuário cadastrado com sucesso!");
    req.session.save(() => {
      return res.redirect("/login");
    });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length) {
      req.flash("errors", login.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
    req.flash("success", "Usuário logado com sucesso!");
    req.session.user = login.user;
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

exports.logout = (req, res) => {
  req.session.user = null;
  req.flash("success", "Usuário desconectado!");
  req.session.save(() => {
    res.redirect("/");
  });
};
