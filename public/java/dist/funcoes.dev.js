"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tudo = function tudo() {
  _classCallCheck(this, tudo);

  this.express = require("express"); //exportação da biblioteca express

  this.app = this.express();
  this.path = require("path");
  this.bodyparse = require("body-parser");
  this.connection = require("./database/Usuario/usuario"); //conexão com banco de dados

  this.image = require("./database/database/teste");
  this.multer = require("multer");
  this.upload = this.multer({
    dest: "public/uploads/"
  });
};

var _default = new tudo();

exports["default"] = _default;