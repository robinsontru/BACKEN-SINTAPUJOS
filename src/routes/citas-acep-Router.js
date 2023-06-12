// Importar el Router de Express y el controlador de comentarios
import { Router } from "express";
import { mirar_citas,crear_citass,eliminar_citas } from "../controllers/citas-acep-Controller.js";

// Crear un router para las rutas de comentarios
const router = Router();

//  Definir las rutas para obtener y agregar comentarios
// router.post("/citas",crear_cita);
router.post("/cita",crear_citass);

router.delete("/cita/:id", eliminar_citas);

router.get("/cita",mirar_citas);
// router.get("/cita/:id", obtener_cita_id);

//funcion para controlar los probelas que no causa el cors
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// Exportar el router
export default router;
