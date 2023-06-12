import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export    const CitaEliminada = sequelize.define('CitaEliminada', {
    cita_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATE,
    //   allowNull: false,
    },
    hora_id: {
      type: DataTypes.TIME,
    //   allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
    //   allowNull: false,
    },
  });
  