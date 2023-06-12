import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const psicologa = sequelize.define('psicologa',{
    tarjetaProfesional:{
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
},{
    timestamps: false
});