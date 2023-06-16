import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import {CitaEliminada} from "../models/CitaEliminadamodel.js";


export const citas= sequelize.define('cita',{
    cita_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      aprendiz_id:{
        type: DataTypes.INTEGER.UNSIGNED,//llave foranea de Aprendiz
        // allowNull: false

      },
      fecha: {
        type: DataTypes.DATE,
        // allowNull: false
      },
      hora_id: {
          type: DataTypes.TIME //llave foranea de horas
          // allowNull: false
        },
        
      descripcion:{
          type: DataTypes.STRING,
        }
},{
  //CreatedAt y UpdatedAt no aparescan.
  timestamps: false
});

//Relaciones
citas.belongsTo(CitaEliminada, {foreignkey: "cita_id"});
CitaEliminada.hasOne(citas, {foreignkey: "cita_id"});

// citas.belongsTo(horas, {foreignkey: "hora_id"});
// horas.hasMany(citas, {foreignkey: "hora_id"});



export default citas;