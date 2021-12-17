const Sequelize=require('sequelize');
const type=require('./database');

const produto = type.define('produto',{
    id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
   image:Sequelize.STRING,
   name: Sequelize.STRING,
   marca: Sequelize.STRING,
   quantidade:Sequelize.INTEGER,
   des:Sequelize.STRING
}
)

produto.sync({force:false});

module.exports=produto;
