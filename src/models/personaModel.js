//eN EL MODELO SE HACE CAMBIOS COMO TIPO DE DATOS COMO BIGINIT Y ENUM EN EL CAMPO DE TIPO DE DOCUMENTO.

import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { citas } from "./citasModel.js";
import { Producto } from "./eventoModel.js";
import { juego } from "./juegosModel.js";
// import { comentarios } from "./comentariosModel.js";
export const persona = sequelize.define('persona', {
    id_persona: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    tipo_documento: {
        type: DataTypes.ENUM(
            "Tarjeta de Identidad",
            "Cedula de Ciudadania",
            "Cedula de Extranjeria"
        ),
        allowNull: false,
    },
    n_documento: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    n_ficha: {
        type: DataTypes.INTEGER,
    },
    telefono: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.ENUM('Aprendiz', 'Enfermera', 'Psicologa'),
    },
    codigoRecuperar:{
        type: DataTypes.STRING,
    }

});

//Relaciones de rol con cita
persona.belongsTo(citas, { foreignkey: "id_persona" });
citas.hasOne(persona, { foreignkey: " cita_id" });

//Relaciones de rol con juegos
persona.belongsTo(juego, { foreignkey: "id_persona" });
juego.hasOne(persona, { foreignkey: "id_juego" });

//Relaciones de rol con evento
persona.belongsTo(Producto, { foreignkey: "id_persona" });
Producto.hasOne(persona, { foreignkey: "id_Evento" });
