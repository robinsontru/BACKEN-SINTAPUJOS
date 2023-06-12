"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enfermera = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database.js");
var _eventoModel = require("./eventoModel.js");
//Importa la constante evento del modelo eventoModel para hacer la relacion.

var enfermera = _database.sequelize.define('enfermera', {
  rethus: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: false
}, {
  //Herencia Modelo personaHerencia a Aprendiz
  inheritance: {
    type: _sequelize.DataTypes.STRING,
    modelName: 'personaHerencia'
  }
});

//Relacion una a muchos enfermera - evento
exports.enfermera = enfermera;
enfermera.hasMany(_eventoModel.evento, {
  foreignKey: 'enfermeraId',
  sourcekey: 'idEvento'
});
_eventoModel.evento.belongsTo(enfermera, {
  foreignKey: 'enfermeraId',
  targetId: 'rethus'
});