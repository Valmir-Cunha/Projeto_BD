///////////////////////////////////////////
//Arquivo de configuração do back-end ////
//////////////////////////////////////////

const back=require("./rotas")

//configuração do ejs
back.Set();
//arquivos estaticos
back.Static();
//rotas para recebimento de dados
back.Date();
//definindo rotas e ligando o servidor
back.conect();



