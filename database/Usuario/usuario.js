const Sequelize=require('sequelize');
const connection=require('../database/database');

const banco = connection.define('usuario',{
    nome:{
        type:Sequelize.STRING,
        allowNULL:false
    },
    email:{
        type:Sequelize.STRING,
        allowNULL:false,
        primarykey:true
    },
    senha:{
        type:Sequelize.STRING,
        allowNULL:false
    }
})


banco.sync({force:false});

module.exports=banco;