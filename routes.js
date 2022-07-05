const express = require("express");
const route = express.Router();
const { loginRequired } = require("./src/middlewares/middleware");

// home

const indexController = require("./src/controllers/indexController");
route.get("/", indexController);

// login

const loginController = require("./src/controllers/loginController");
route.get("/login", loginController.index);
route.get("/login/logout", loginController.logout);
route.post("/login/register", loginController.register);
route.post("/login/login", loginController.login);

// contacts

const contactsController = require("./src/controllers/contactsController");
route.get("/contacts", loginRequired, contactsController.index);
route.post("/contacts/register", loginRequired, contactsController.register);
route.get("/contacts/:id", loginRequired, contactsController.editIndex);
route.post("/contacts/edit/:id", loginRequired, contactsController.edit);
route.get("/contacts/delete/:id", loginRequired, contactsController.delete);

module.exports = route;
