"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evento = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database.js");
var evento = _database.sequelize.define('evento', {
  idEvento: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imagen: {
    type: _sequelize.DataTypes.BLOB('long'),
    allowNull: false
  }
}, {
  timestamps: true
});
exports.evento = evento;