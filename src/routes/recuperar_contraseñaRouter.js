import {Router} from "express";
import {recuperar,ActualizarContrasena} from "../controllers/auth/recuperar_contrasenaController.js"

const router = Router()

router.post('/recuperar',recuperar)
router.patch('/actualizarContrasena/:email',ActualizarContrasena)
export default router;