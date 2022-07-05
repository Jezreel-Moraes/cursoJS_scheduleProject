import validator from "validator";

export default class ContactForm {
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
    const nameInput = form.querySelector('input[name="name"]');
    const lastNameInput = form.querySelector('input[lastName="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const telInput = form.querySelector('input[name="tel"]');

    this.clearErrors();

    const errors = [];

    if (!nameInput.value) errors.push('O campo "Nome" é obrigatório!');
    if (!emailInput.value && !telInput.value)
      errors.push("Dever ser adicionado pelo menos um e-email ou telefone!");

    if (errors.length) return this.renderErrors(errors);
    if (emailInput.value && this.validateEmail(emailInput)) return;

    form.submit();
  }

  validateEmail(emailInput) {
    return validator.isEmail(emailInput.value)
      ? true
      : this.renderErrors(["E-mail invalido!"]);
  }

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
