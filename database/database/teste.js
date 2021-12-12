const Sequelize=require('sequelize');
const type=require('./database');

const imag = type.define('imagem',{
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

imag.sync({force:false});

module.exports=imag;
