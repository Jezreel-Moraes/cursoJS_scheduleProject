import validator from "validator";

export default class LoginForm {
  constructor(formClass) {
    this.form = null;

    try {
      this.form = document.querySelector(formClass);
      this.errorsList = this.form.nextElementSibling;
    } catch (error) {}
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.validate(event);
    });
  }

  validate(event) {
    const form = event.target;
    const emailInput = form.querySelector('input[name="email"]');
    const passwordInput = form.querySelector('input[name="password"]');

    this.clearErrors();

    if (!emailInput.value || !passwordInput.value)
      return this.renderErrors(["Preencha todos os campos!"]);

    let validEmail = this.validateEmail(emailInput);
    let validPassword = this.validatePassword(passwordInput);

    const error = !validEmail || !validPassword;
    if (error) return;
    form.submit();
  }

  validateEmail(emailInput) {
    const errors = [];

    if (!validator.isEmail(emailInput.value)) errors.push("E-mail invalido!");

    return errors.length ? this.renderErrors(errors) : true;
  }

  validatePassword(passwordInput) {
    const errors = [];

    if (passwordInput.value.length < 3 || passwordInput.value.length >= 50)
      errors.push("A senha deve conter entre 3 e 50 caracteres!");

    return errors.length ? this.renderErrors(errors) : true;
  }
  s;
  renderErrors(errors) {
    this.errorsList.classList.add("visible");
    for (const error of errors) {
      const element = createLi(error);
      this.errorsList.appendChild(element);
    }
    return false;
  }

  clearErrors() {
    this.errorsList.innerText = "";
    this.errorsList.classList.remove("visible");
  }
}

function createLi(msg) {
  const li = document.createElement("li");
  li.innerText = msg;
  return li;
}
