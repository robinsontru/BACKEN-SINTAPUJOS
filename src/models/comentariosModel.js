import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { persona } from "./personaModel.js";
export const comentarios = sequelize.define('comentarios', {
    id_Comentarios: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },   
    n_documento: {
        type: DataTypes.BIGINT,
     
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

}, {
    timestamps: true,
});
// //Relaciones de rol con comentarios
comentarios.belongsTo(persona, {foreignkey: "id_Comentarios"});
persona.hasOne(comentarios, {foreignkey: " id_persona"});