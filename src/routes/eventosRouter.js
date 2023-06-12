
// export default router;

import { Router } from "express";
//impost de multer para subir img
import multer from 'multer';
//impost de path para subir img
import path from 'path';

//Importa el controlador aprendizController
import {  crearImagen, verimg, deleteimg, idimg } from "../controllers/eventosController.js";
const router = Router()
//esta funcion nos ayuda ala creacionde una nueva carpeta y para poder guardar la img
import { fileURLToPath } from 'url';
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const storage = multer({ dest: './src/public' });
const upload = multer({ storage });

//rutas de eventos
router.get('/imagenes', verimg);
router.delete('/evento/:id', deleteimg);
router.post('/imagen', storage.single('imagen'), crearImagen);
router.get('/evento/:id', idimg);


//funcion para controlar los probelas que no causa el cors
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


export default router;

