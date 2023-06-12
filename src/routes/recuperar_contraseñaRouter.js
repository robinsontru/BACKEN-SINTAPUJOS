import {Router} from "express";
import {recuperar,ActualizarContraseña} from "../controllers/auth/recuperar_contrasenaController.js"

const router = Router()

router.post('/recuperar',recuperar)
router.patch('/actualizarContrasena/:email',ActualizarContraseña)
export default router;