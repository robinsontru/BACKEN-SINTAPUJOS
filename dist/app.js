"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _aprendizRouter = _interopRequireDefault(require("./routes/aprendizRouter.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//IMPORTAMOS EXPRESS

//Importamos Rutas

var app = (0, _express["default"])();
//Middlewares, esto para que el servidor interprete los datos en formato json
app.use(_express["default"].json());
//Usamos la ruta aprendiz
app.use(_aprendizRouter["default"]);
var _default = app;
exports["default"] = _default;