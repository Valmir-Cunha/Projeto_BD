const Sequelize=require('sequelize');
const type=require('../database/database');

const categoria=type.define('categoria',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique:true
    },
    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    des:type.Sequelize.STRING

});

categoria.sync({force:false});

module.exports=categoria;