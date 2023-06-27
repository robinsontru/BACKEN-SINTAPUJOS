//IMPORTACION DEL ROUTER DESDE EXPRESS
import { Router } from "express";

//IMPORTACION DEL CONTROLADOR QUE TIENE LOS METODOS DEL LOGIN Y EL REGISTRO
import {
  registroPersona,
  deletePersona,
  getIdpersona,
  getPersona,
  getPersona1,
  updatePersona,
  loginPersona,
  verificarPersonaExistente,
} from "../controllers/auth/loginController.js";
const router = Router();

//Respuestas HTTP CORS
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

//Peticiones tanto del login y registro.
// router.get("/persona", getPersona1);
router.get("/", getPersona);
router.get("/persona", getPersona);
router.get("/persona/:n_documento", getIdpersona);
router.patch("/persona/:id", updatePersona);
router.delete("/persona/:id", deletePersona);

//Post del regisgtro
router.post("/persona", verificarPersonaExistente, registroPersona);
//Post del login
router.post("/login", loginPersona);

export default router;