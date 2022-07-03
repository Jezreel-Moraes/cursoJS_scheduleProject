const path = require("path");

module.exports = {
  mode: "production", //cria os arquivos minificando o código
  // mode: "development", //cria os arquivos sem tentar minificar
  entry: "./frontend/main.js",
  output: {
    path: path.resolve(__dirname, "public", "assets", "js"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        exclude: /node_modules/, // ignora o node_modules
        test: /\.js$/, // chama coisas com final .js
        use: {
          loader: "babel-loader", // configurando o loader
          options: {
            presets: ["@babel/env"], // como interpretar o código
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map", // mapeia os arquivos originais
};
