const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validate();
    if (this.errors.length) return;

    this.user = await LoginModel.findOne({ email: this.body.email });
    if (!this.user) return this.errors.push("Usuário não existe!");

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha incorreta!");
      this.user = null;
    }
  }

  async register() {
    this.validate();
    if (this.errors.length) return;

    await this.userAlreadyExists();
    if (this.errors.length) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    this.user = await LoginModel.create(this.body);
  }

  validate() {
    this.cleanUp();
    const email = this.body.email;
    const password = this.body.password;

    if (!validator.isEmail(email)) this.errors.push("E-mail invalido");

    if (password.length < 3 || password.length >= 50)
      this.errors.push("A senha deve ter entre 3 e 50 caracteres");
  }

  async userAlreadyExists() {
    const user = await LoginModel.findOne({ email: this.body.email });
    if (user) this.errors.push("Esse e-mail já está cadastrado!");
  }

  cleanUp() {
    for (const key in this.body)
      if (typeof this.body[key] !== "string") this.body[key] = "";

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Login;
