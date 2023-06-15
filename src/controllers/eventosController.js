import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { Producto } from "../models/eventoModel.js";

import { fileURLToPath } from 'url';
const filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(filename);
const storage = multer({ dest: 'src/public' });

//constroller para observar las img 
export async function verimg(req, res) {
  try {
    const imagenes = await Producto.findAll();
    res.json(imagenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las imágenes.' });
  }
}
//controllers para eliminar img
export async function deleteimg(req, res) {
  const { id } = req.params;
  try {

    await Producto.destroy({
      where: {
        idEvento: id,
      },
    });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}
//controllers para e ver img por id
export async function idimg(req, res) {
  const { id} = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message:error.message});
    }
    // Enviar la imagen encontrada como respuesta
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message:'mal' });
  }

}
//controllers para crear img
export const crearImagen= async (req, res) => {
  try {
    const { originalname, mimetype, path } = req.file;
 
    // Renombrar el archivo temporal
    fs.renameSync(path, path + '.' + mimetype.split('/')[1]);

    // Leer el contenido del archivo
    const imagenData = fs.readFileSync(path + '.' + mimetype.split('/')[1]);

    // Crear el producto y asignar el nombre original y el contenido del archivo
    const producto = await Producto.create({
      nombre: originalname,
      imagen: imagenData,
    });
    // Eliminar el archivo temporal después de leerlo
    fs.unlinkSync(path + '.' + mimetype.split('/')[1]);
    // res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error al subir la imagen.' });
  }
};