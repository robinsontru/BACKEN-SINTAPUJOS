//IMPORTAMOS EXPRESS
import express from "express";
//Importamos Morgan desde express
import morgan from "morgan";
//Importamos Rutas de eventos
import eventosRouter from './routes/eventosRouter.js'
// //Importamos Rutas de comentarios
import comentarioRoutes from "./routes/comentariosRouter.js";
// Importamos Rutas de  persona
import personaRoutes from "./routes/personaRouter.js";
// Importamos Rutas de cita
import citaRoutes from "./routes/citasRouter.js";
// Importamos Rutas de citas
import citasRoutes from "./routes/citas-acep-Router.js";
//impor de cors
import cors from 'cors';
//Importamos Rutas de recuperar contraseña
import recuperarContraseñaRouter from "./routes/recuperar_contraseñaRouter.js"
const app = express();
//Middlewares, esto para que el servidor interprete los datos en formato json
app.use(morgan('dev'));
app.use(express.json());
//aqui utilizamos  cors para conectar con vvue
app.use(cors());
//ruta de eventos
app.use('/',eventosRouter);
//ruta de persona
app.use('/',personaRoutes);
//Ruta comentarios
app.use("/api", comentarioRoutes);
//Ruta cita
app.use("/",citaRoutes);
//Ruta citas
app.use("/",citasRoutes);
//Ruta recuperar
app.use("/apirecuperar",recuperarContraseñaRouter);


//expor de app para poderlo utilizar en index
export default app;

