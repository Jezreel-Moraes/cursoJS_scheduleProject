const Contact = require("../models/ContactModel");

module.exports = async (req, res, next) => {
  const contacts = await Contact.getContacts();
  res.render("index", { contacts });
};
