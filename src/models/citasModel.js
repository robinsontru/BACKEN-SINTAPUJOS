import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
// import {aprendiz} from "../models/aprendizModel.js";
// import {horas} from "../models/horaCitasModel.js"

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
// citas.belongsTo(aprendiz, {foreignkey: "aprendiz_id"});
// aprendiz.hasOne(citas, {foreignkey: "aprendiz_id"});

// citas.belongsTo(horas, {foreignkey: "hora_id"});
// horas.hasMany(citas, {foreignkey: "hora_id"});



export default citas;