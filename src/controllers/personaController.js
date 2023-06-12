// Importar el modelo de Sequelize y la instancia de Sequelize
import { persona } from "../models/personaModel.js";

// Definir los métodos del controlador

// Controlador para obtener todos las personas
export async function obtenerpersona(req, res) {
  try {
    // Obtener todos los comentarios de la base de datos
    const people = await persona.findAll(
      {
        atributes: ["id_Comentarios", "comentario"]
      });
    res.json(people);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:error.message });
  }
}

//controlador para obtener persona por id
export async function obtenerpersona_id(req, res) {
  const { id } = req.params;
  try {
    const comment = await persona.findOne(
      {
        where: {
          id_persona :id
        }
      }
    );
    res.json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el comentario" });
  }
}

// Método para crear un persona
export async function crearpersona(req, res) {
  const {constraseña,email,apellido,tipo_documento,N_documento,nombre,telefono,n_ficha,rol  } = req.body;
//   if (!comentario){
//     return res.status(400).json({ message:Error.message})
//   }
  try {
    let people = await persona.create({ constraseña,email,apellido,tipo_documento,N_documento,nombre,telefono,n_ficha,rol},
       {
        fields:  [ "constraseña","email","apellido","tipo_documento","N_documento","nombre","telefono","n_ficha","rol"]
    }
    );
// return res.status(200).json({ message: 'Comentario creado correctamente' })
    res.json(people)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, });
  }
}
// Controlador para eliminar un persona por id
export async function eliminarpersona(req, res) {
  const { id } = req.params;
  try {
    await persona.destroy({
      where: {
        id_persona : id,
      },
    });
    return res.status(200).json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

