//Importamos modelo con el que vamos a trabajar 
import { persona } from "../../models/personaModel.js";
//IMPORTAMOS JSONWEBTOKEN Y BCRYPJT PARA MANEJAR CONTRASEÑAS Y SU HASHEO 
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
//Funcion para le verificacion si el aprendiz esta ya registrado
export async function verificarPersonaExistente(req, res, next) {
  try {
    const { n_documento } = req.body;
//Promesa para buscar el numero de documento de la persona
    const personasExistentes = await persona.findAll({
      where: { n_documento }
    });
//Comparacion para saber si la persona ya esta registrada
    if (personasExistentes.length > 0) {
      return res.status(409).json({ error: 'La persona ya está registrada en la base de datos' });
    }
    // Si la persona no existe, continúa con la siguiente función de middleware
    next();
  } catch (error) {//Error de conflicto
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
}


//fUNCION PARA TRAER TODAS LOS APRENDICES DE LA DB
export async function getPersona(req, res) {
  try {
    const user = await persona.findAll();//PROMESA PARA TRAER TODOS LOS APRENDICES
    res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
};
//FUNCION PARA TRAER UNA APRENDICES DE LA DB POR ID
export async function getIdpersona(req, res) {
  try {
    const user = await persona.findByPk(req.params.id);//PROMESA PARA TRAER EL ID MEDIANTE EL REQ
    if (!user) {
      return res.status(404).json({
        message: "Persona no encontrada",
      });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
};

//////////////////////////////REGISTRO////////////////////////////////
//FUNCION PARA EL REGISTRO DEL APRENDIZ
export async function registroPersona(req, res) {
  try {
    const { rol,nombre, apellido, tipo_documento, n_documento, n_ficha, telefono, email, contrasena } =
      req.body;
    const passHash = await bcryptjs.hash(contrasena, 8);// SE UTILIZA bcryptjs Y SE REALIZA UNA FUNCION hash.CONVIRTIENDO LA CONTRASEÑA EN UNA CADENA DE CARACTERES CON SU LONGITUD
    const user = await persona.create({//SE CREA LOS DEMAS CAMPOS NECESARIOS PARA EL REGISTRO DEL APRENDIZ
      nombre,
      apellido,
      tipo_documento,
      n_documento,
      n_ficha,
      telefono,
      email,
      rol,
      contrasena: passHash,
    });
    //SE OBTIENE UNA RESPUESTA JSON CON LOS CAMPOS YA SOLICITADOS
    res.send({
      id_persona: user.id_persona,
      nombre,
      apellido,
      tipo_documento,
      n_documento,
      n_ficha,
      telefono,
      email,
      rol,
      //Si se requiere mostrar la contraseña
      contrasena: passHash,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
};
//////////////////////////////LOG IN/////////////////////////////////
export async function loginPersona(req, res) {
  try {
    const { n_documento, contrasena } = req.body;
    const user = await persona.findOne({//PROMESA PARA BUSCAR LAS CONDICIONES COMO EL NUMERO DE DOCUMENTO O CONTRASEÑA
      where: { n_documento },
    });
    if (!user) {
      res.status(200).json({
        icon: "error",
        message: "Ingrese Documento y Contraseña",
      });
    } else {
      const passHash = await bcryptjs.compare(contrasena, user.contrasena);//SE UTILIZA LA FUNCION COMPARE DE LA BIBLIOTECA DE BCRYPTJS PARA COMPARA LA CONTRASEÑA
      //RESPUESTAS EN CASO DE ERROR SI NO COINCIDE EL TOKEN
      if (!passHash) {
        res.status(200).json({
          message: "Contraseña incorrecta",
        });
        //ESTA RESPUESTA SE DA CUANDO EL TOKEN DE ACCESO COINCIDE
      } else {
        const token = jwt.sign({ userId: user.id }, "mysecretkey", {
          expiresIn: "2h",
        });
        res.status(200).json({
          code: 201,
          token,
          message: "Bienvenido",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Algo salió mal con el servidor",
    });
  }
};
//FUNCION PARA ELIMINAR A LA PERSONA POR ID
export async function deletePersona(req, res) {
  try {
    const user = await persona.destroy({//PROMESA PARA ELIMINAR AL APRENDIZ DE LA DB MEDIANTE ID
      where: { id_persona: req.params.id },
    });
    //RESPUESTAS EN CASO DE QUE NO SE ENCUENTRE EL APRENDIZ
    if (!user) {
      return res.status(404).json({
        message: "Persona no encontrada",
      });
    }
    //RESPUESTA CUANDO EL APRENDIZ ES BORRADO DE LA DB
    res.status(200).json({
      message: "Persona borrada correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
}

//FUNCION PARA ACTUALIZAR DATOS ESPECIFICOS DE UN APRENDIZ REGISTRADO
export async function updatePersona(req, res) {
  const {
    nombre,
    apellido,
    tipo_documento,
    n_documento,
    n_ficha,
    telefono,
    email,
    contrasena,
    rol,
  } = req.body;

  try {
    const user = await persona.findByPk(req.params.id);//PROMESA PARA HACER LA BUSQUEDA DEL APRENDIZ MEDIANTE EL ID
    if (!user) {
      return res.status(404).json({
        message: "Persona no encontrada",
      });
    }
    await user.update({//PROMESA PARA COMPARACION DE DATOS Y CAMBIO DE DATOS MEDIANTE LA PETICION
      nombre: nombre || user.nombre,
      apellido: apellido || user.apellido,
      tipo_documento: tipo_documento || user.tipo_documento,
      n_documento: n_documento || user.n_documento,
      n_ficha: n_ficha || user.n_ficha,
      telefono: telefono || user.telefono,
      email: email || user.email,
      rol: rol || rol.rol,
      contrasena: contrasena ? await bcryptjs.hash(contrasena, 8) : user.contrasena,
    });
//RESPUESTA EN CASO DE ERROR
    res.json(user);
  } catch (error) {
    return res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
};