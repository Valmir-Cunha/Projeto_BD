
const { conect } = require('../rotas');
const db=require('./database');

db.connect((err)=>{console.log(err);});

module.exports={
        async conectar(nome){

            var tabela=  db.query(`select * from site.usuario where nome='${nome}';`);
            console.log((await tabela).rows);
            return 1;

        },

        async insersion(name,email,password){
            await db.query(`insert into site.usuario values('${name}','${password}','${email}')`);
        }
}    

