"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _aprendizController = require("../controllers/aprendizController.js");
//Importa el controlador aprendizController

var router = (0, _express.Router)();
router.get("/aprendiz", _aprendizController.getAprendizes);
router.get("/aprendiz/:id");
router.post("/aprendiz", _aprendizController.createAprendiz);
router.put("/aprendiz/:id");
router["delete"]("/aprendiz/:id");
var _default = router;
exports["default"] = _default;