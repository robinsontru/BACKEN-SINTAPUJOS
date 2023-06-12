"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.citasAprendiz = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database");
var citasAprendiz = _database.sequelize.define('citaAprendiz', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: {
    type: _sequelize.DataTypes.DATE
  },
  hora: {
    type: _sequelize.DataTypes.TIME
  },
  lugar: {
    type: _sequelize.DataTypes.STRING
  }
});
exports.citasAprendiz = citasAprendiz;