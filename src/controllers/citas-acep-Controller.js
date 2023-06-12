// Importar el modelo de Sequelize y la instancia de Sequelize
import { sequelize } from "../database/database.js";
import { CitaEliminada } from "../models/CitaEliminadamodel.js";

// Definir los métodos del controlador

// Controlador para obtener todos las personas
export async function mirar_citas(req, res) {
  try {
    // Obtener todos los comentarios de la base de datos
    const people = await CitaEliminada.findAll(

    )
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

//controlador para obtener persona por NOMBRE
export async function obtener_citas_id(req, res) {
  const { id } = req.params;
  try {
    const comment = await citas.findOne(
      {
        where: {
          cita_id: id
        }
      }
    );
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message, });
  }
}

// Método para crear un persona
export async function crear_citass(req, res) {

  const { fecha, hora_id, lugar } = req.body;

  try {
    let city = await CitaEliminada.create({ fecha, hora_id, lugar },

    );

    res.json(city)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, });
  }
}
// // Controlador para eliminar un persona por id
export async function eliminar_citas(req, res) {
  const { id } = req.params;
  try {
    await CitaEliminada.destroy({
      where: {
        cita_id: id,
      },
    });
    return res.status(200).json({ message: 'Cita elimininada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

//Método para dar reseña
export async function editar_reseña(req, res) {
  try {
    const { cita_id } = req.params;
    const { descripcion } = req.body
    const cita = await citas.findByPk(cita_id);
    cita.descripcion = descripcion;
    await cita.save();
    res.json(cita);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};