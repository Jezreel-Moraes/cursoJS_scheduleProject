const express = require("express");
const route = express.Router();

// home

const homeController = require("./src/controllers/homeController");
route.get("/", homeController);

//form

const formController = require("./src/controllers/formController");
route.get("/form", formController.get);
route.post("/form", formController.post);

module.exports = route;
