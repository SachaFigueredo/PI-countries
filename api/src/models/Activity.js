const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
    sequelize.define('Activity', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull:false,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dificultad:{
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
        validate: {
            min : 1,
            max : 5
        },
    duracion :{
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    temporada: {
        type: DataTypes.ENUM("verano", "otoño", "invierno", "primavera")
    }
    }
    });
};