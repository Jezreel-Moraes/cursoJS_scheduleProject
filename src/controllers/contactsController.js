const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
  res.render("contacts", { contact: {} });
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
    req.flash("success", "Contato cadastrado com sucesso!");
    req.session.save(() => {
      return res.redirect("back");
    });
    return;
  } catch (error) {
    console.log(error);
    return res.render("404");
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.render("404");
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.render("404");
  res.render("contacts", { contact });
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");
    const contact = new Contact(req.body);
    await contact.edit(req.params.id);

    if (contact.errors.length) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }

    if (!contact.contact) return res.render("404");

    req.flash("success", "Contato editado com sucesso!");
    req.session.contact = contact.contact;
    req.session.save(() => {
      return res.redirect("/");
    });
    return;
  } catch (error) {
    console.log(error);
    res.render("404");
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.render("404");
    const deleteContact = await Contact.deleteContact(req.params.id);
    if (!deleteContact) return res.render("404");

    req.flash("success", "Contato removido com sucesso!");
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
};
