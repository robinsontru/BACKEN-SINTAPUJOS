"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.juego = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database.js");
var juego = _database.sequelize.define('juegos', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true
  },
  nombre: {
    type: _sequelize.DataTypes.STRING
  }
});
exports.juego = juego;