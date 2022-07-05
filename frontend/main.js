import "core-js/stable";
import "regenerator-runtime/runtime";
import "./assets/css/style.css";
import ContactForm from "./modules/ContactForm";
import LoginForm from "./modules/LoginForm";

const loginForm = new LoginForm(".form-login");
const registerForm = new LoginForm(".form-register");
const contactForm = new ContactForm(".form-contact");

loginForm.init();
registerForm.init();
contactForm.init();
