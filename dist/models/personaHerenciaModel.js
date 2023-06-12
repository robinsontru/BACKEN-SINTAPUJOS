"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.personaHerencia = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database.js");
var personaHerencia = _database.sequelize.define('personaHerencia', {
  id: {
    type: _sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  apellido: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  tipoDocumento: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  numeroDocumento: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: _sequelize.DataTypes.BIGINT
  },
  fechaNacimiento: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  correoElectronico: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    isEmail: true
  },
  contraseñaLogin: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});
exports.personaHerencia = personaHerencia;