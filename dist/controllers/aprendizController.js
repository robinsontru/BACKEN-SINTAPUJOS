"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAprendizes = exports.createAprendiz = void 0;
var _aprendizModel = require("../models/aprendizModel.js");
var getAprendizes = function getAprendizes(req, res) {
  res.send('getting aprendiz');
};
exports.getAprendizes = getAprendizes;
var createAprendiz = function createAprendiz(req, res) {
  //console.log(req.body) verificamos si estan llegando los datos.

  res.send('creating Aprendiz');
};
exports.createAprendiz = createAprendiz;