"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.citas = void 0;
var _sequelize = require("sequelize");
var _database = require("../database/database.js");
var citas = _database.sequelize.define('agendaCitas', {
  id: {}
});
exports.citas = citas;