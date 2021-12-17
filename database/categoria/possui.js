const Sequelize=require('sequelize');
const type=require('../database/database');
const Categoria=require("./categoria");
const produto=require("../database/produto");

const possui=type.define('possui');


Categoria.hasMany(possui,{
    foreignKey:'idcategoria',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});//muito para muitos
possui.belongsTo(Categoria,{
    constraint:true,
    foreignKey:'idcategoria',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})//1 para 1
produto.hasMany(possui,{
    foreignKey:'idproduto',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});
possui.belongsTo(produto,{
    constraint:true,
    foreignKey:'idproduto',
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
})
// possui.sync({force:false});
module.exports=possui;