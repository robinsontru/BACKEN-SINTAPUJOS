// Importar el modelo de Sequelize y la instancia de Sequelize
import Filter from 'bad-words-es';
// import { Error } from "sequelize"
import { comentarios } from "../models/comentariosModel.js";
import { persona } from "../models/personaModel.js";

// Controlador para obtener todos los comentarios
export async function obtenerComentarios(req, res) {
  try {
    // Obtener todos los comentarios de la base de datos
    const comment = await comentarios.findAll(
      {
        atributes: ["id_Comentarios", "comentario"]
      });
    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

//controlador para obtener comentarios por id
export async function obtenerComentario(req, res) {
  const { id_Comentarios } = req.params;
  try {
    const comment = await comentarios.findOne(
      {
        where: {
          id_Comentarios,
        }
      }
    );
    res.json(comment);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el comentario" });
  }
}

////////////////////////////////Comentarios con filtrado bad-word-Es///////////////////////
//1-Para el funcionamiento del filtro es necesesario la libreria
//2- npm install bad-words-es --save
//3-Hacer la importacion de la libreria

// Crear una instancia de Filter
const filter = new Filter();
//En esta linea añadimos codigo
filter.addWords('gonorrea', "marica", "hpta", "hp", "mk", "gnrrea", "hijueputa", "pirobo", "sapo", "sapa", "tonto", "chamo", "chama", "huevon", "wevon", "weon", "peye", "Peye", "maluco", "zunga", "pendejo", "menso", "juepucha", "gueva", "gueba", "weba", "jueputa", "malparido", "malparida", "care chimba", "care monda", "chimba", "monda", "lambon", "lambona",);

// Método para crear un comentario
export async function crearComentarios(req, res) {
  const { comentario, n_documento } = req.body;

  if (!comentario ) {
    return res.status(400).json({ message: 'El comentario y el número de documento son campos requeridos.' });
  }

  try {
    const comentarioFiltrado = filter.clean(comentario);  // Filtra el comentario utilizando la función de filtrado

    // Crea el comentario en la base de datos
    const nuevoComentario = await comentarios.create({ comentario: comentarioFiltrado, n_documento });

    res.json(nuevoComentario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}


// Controlador para eliminar un comentario forma 1
export async function eliminarComentario(req, res) {
  const { id } = req.params;
  try {
    await comentarios.destroy({
      where: {
        id_Comentarios: id,
      },
    });
    return res.status(200).json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}



export async function crearComentario1(req, res) {
  const { n_documento, comentario } = req.body;

  try {
    const personaLogueada = req.session.personaLogueada; // Assuming the logged-in person information is stored in req.session.personaLogueada

    const nuevoComentario = await comentario.create({
      n_documento: personaLogueada.n_documento,
      comentario,
    });

    const persona = await persona.findByPk(personaLogueada.id_persona);

    nuevoComentario.persona = persona;

    res.json({ message: "Comentario creado exitosamente", comentario: nuevoComentario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el comentario" });
  }
}