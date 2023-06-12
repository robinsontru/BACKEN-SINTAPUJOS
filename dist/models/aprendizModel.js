"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aprendiz = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database.js");
var _comentariosModel = require("./comentariosModel.js");
var _juegosModel = require("./juegosModel.js");
var _personaHerenciaModel = require("./personaHerenciaModel.js");
//Importa la constante comentarios del modelo comentariosModel para hacer la relacion.

//Importa la constante juego del modelo juegosModel para hacer la relacion.

var aprendiz = _database.sequelize.define('aprendices', {
  numeroFicha: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  timestamps: false,
  //Herencia Modelo personaHerencia a Aprendiz
  inheritance: {
    type: _sequelize.DataTypes.STRING,
    modelName: 'personaHerencia'
  }
});

//Relacion de uno a muchos aprendiz - comentarios
exports.aprendiz = aprendiz;
aprendiz.hasMany(_comentariosModel.comentarios, {
  foreignkey: 'aprendizId',
  sourcekey: 'id'
});
_comentariosModel.comentarios.belongsTo(aprendiz, {
  foreignkey: 'aprendizId',
  targetId: 'idComentarios'
});

//Relacion de un a muchos aprendiz - juegos
aprendiz.hasMany(_juegosModel.juego, {
  foreignkey: 'aprendizJuegoId',
  sourcekey: 'id'
});