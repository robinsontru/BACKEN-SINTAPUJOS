import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
export const Producto = sequelize.define('evento', {
  idEvento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imagen: {
      type: DataTypes.BLOB('long'),
      allowNull: false
    }
});