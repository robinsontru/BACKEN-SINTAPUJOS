"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comentarios = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database.js");
var comentarios = _database.sequelize.define('comentarios', {
  idComentarios: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  comentario: {
    type: _sequelize.DataTypes.TEXT
  }
}, {
  timestamps: true
});
exports.comentarios = comentarios;