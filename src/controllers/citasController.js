

// Importar el modelo de Sequelize y la instancia de Sequelize
import { sequelize } from "../database/database.js";
import { citas } from "../models/citasModel.js";
import { CitaEliminada } from "../models/CitaEliminadamodel.js";

// Definir los métodos del controlador

// Controlador para obtener todos las personas
export async function mirar_citas(req, res) {
  try {
    // Obtener todos los comentarios de la base de datos
    const people = await citas.findAll(

    )
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

//controlador para obtener persona por NOMBRE
export async function obtener_cita_id(req, res) {
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
export async function crear_cita(req, res) {

  const { fecha, hora_id, lugar } = req.body;

  try {
    let city = await citas.create({ fecha, hora_id, lugar },

    );
    

    res.json(city)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, });
  }
}
// // Controlador para eliminar un persona por id
export async function eliminar_cita(req, res) {
  const { id } = req.params;
  try {
    await citas.destroy({
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
// // Controlador para eliminar un cita y la dirigue a otra tabla
export async function eliminar_cita_tabla(req, res) {
  const { id } = req.params;

  try {
    const cita = await citas.findOne({ where: { cita_id: id } });
    if (!cita) {
      return res.status(404).json({ message: 'Cita no encontrada' });
   
    }

    await citas.destroy({ where: { cita_id: id } });

    await CitaEliminada.create({
      fecha: cita.fecha,
      hora_id: cita.hora_id,
      descripcion: cita.descripcion,
    });

    return res.status(200).json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}


// Método para crear un persona con restricion

export async function crear_cita1(req, res) {
  const { fecha, hora_id, descripcion } = req.body;
  try {
    // Obtener la fecha actual
    const fechaActual = new Date().toISOString().split('T')[0];
    // Obtener el número de citas para la fecha especificada
    const numeroCitas = await citas.count({ where: { fecha } });
    // Verificar si se ha alcanzado el límite de citas para la fecha actual
    if (numeroCitas >= limiteCitasPorDia(fechaActual)) {
      return res.status(400).json({ message: 'Se ha alcanzado el límite de citas permitidas para esta fecha.' });
    }
    const citaExistente = await citas.findOne({ where: { fecha, hora_id } });
    if (citaExistente) {
      return res.status(400).json({ message: 'La hora seleccionada ya está ocupada.' });
    }
    const horaInicio = new Date(fecha + ' ' + hora_id);
    const horaFin = new Date(horaInicio.getTime() + 20 * 60000); // Sumar 20 minutos (20 * 60 * 1000 ms)
    // Crear una nueva cita
    let newCita = await citas.create({ fecha, hora_id, descripcion });
    res.json(newCita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}
function limiteCitasPorDia(fecha) {
  const limiteCitasIniciales = 10;
  const fechaActual = new Date().toISOString().split('T')[0];
  const diasPasados = Math.floor((new Date(fecha) - new Date(fechaActual)) / (1000 * 60 * 60 * 24));
  const limiteCitas = limiteCitasIniciales + (diasPasados * 10);
  return limiteCitas;
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