const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  tel: { type: String, required: false, default: "" },
  createdIn: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
  }

  async edit(id) {
    if (typeof id !== "string" || id.length !== 24) return;

    this.validate();
    if (this.errors.length) return;

    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }

  async register() {
    this.validate();
    if (this.errors.length) return;

    await this.contactAlreadyExists();
    if (this.errors.length) return;

    this.contact = await ContactModel.create(this.body);
  }

  validate() {
    this.cleanUp();
    const name = this.body.name;
    const email = this.body.email;
    const tel = this.body.tel;

    if (!name) this.errors.push('O campo "Nome" é obrigatório!');
    if (email & !validator.isEmail(email)) this.errors.push("E-mail invalido");
    if (!email & !tel)
      this.errors.push(
        "O contato precisa ter pelo menos um e-mail ou telefone!"
      );
  }

  async contactAlreadyExists() {
    let email = this.body.email
      ? await ContactModel.findOne({ tel: this.body.email })
      : null;

    let tel = this.body.tel
      ? await ContactModel.findOne({ tel: this.body.tel })
      : null;

    const contact = email || tel;

    if (contact)
      this.errors.push(
        "Contato já existente: e-mail ou telefone já cadastrado!"
      );
  }

  cleanUp() {
    for (const key in this.body)
      if (typeof this.body[key] !== "string") this.body[key] = "";

    this.body = {
      name: this.body.name,
      lastName: this.body.lastName,
      email: this.body.email,
      tel: this.body.tel,
    };
  }

  static async findById(id) {
    if (typeof id !== "string" || id.length !== 24) return;
    return await ContactModel.findById(id);
  }

  static async getContacts() {
    return await ContactModel.find().sort({ createdIn: -1 });
  }

  static async deleteContact(id) {
    if (typeof id !== "string" || id.length !== 24) return;
    return await ContactModel.findByIdAndDelete(id);
  }
}

module.exports = Contact;
