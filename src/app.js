//IMPORTAMOS EXPRESS
import express from "express";
//Importamos Morgan desde express
import morgan from "morgan";
//Importamos Rutas de eventos
import eventosRouter from './routes/eventosRouter.js'
// impostamos Rutas de comentarios
import comentarioRoutes from "./routes/comentariosRouter.js";
// impostamos Rutas de persona
import personaRoutes from "./routes/personaRouter.js";
// impostamos Rutas de cita
import citaRoutes from "./routes/citasRouter.js";
// impostamos Rutas de citas
import citasRoutes from "./routes/citas-acep-Router.js";
//impor de cors
import cors from 'cors'
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


//expor de app para poderlo utilizar en index
export default app;

