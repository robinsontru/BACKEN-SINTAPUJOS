// Importar el Router de Express y el controlador de comentarios
import { Router } from "express";
import { crearComentarios, eliminarComentario, obtenerComentario, 
    obtenerComentarios
 } from "../controllers/comentariosController.js";

// Crear un router para las rutas de comentarios
const router = Router();

// Definir las rutas para obtener y agregar comentarios
router.post("/comentario", crearComentarios);
router.delete("/comentario/:id", eliminarComentario);
router.get("/comentario", obtenerComentarios);
router.get("/comentario/:id", obtenerComentario);

//funcion para controlar los probelas que no causa el cors
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

// Exportar el router
export default router;
