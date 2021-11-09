const express=require("express");//exportação da biblioteca express
const app=express();
const path=require("path");
const bodyparse=require("body-parser");
const connection=require("./database/funcoes");//conexão com banco de dados

module.exports={
    //definição de rotas e ligação do servidor
    conect(){
        
        app.get("/",(req,res)=>{
            res.render("pagMain");
        });
        app.get("/login.ejs",(req,res)=>{
            res.render("login");
        });
        app.get("/cadrastoUsuario.html",(req,res)=>{
            res.sendFile(path.join(__dirname + '/views/cadrastoUsuario.html'))
        });
        app.get("/produtos.html",(req,res)=>{
            res.sendFile(path.join(__dirname + '/views/produtos.html'))
        });
        app.get("/produtoView.html",(req,res)=>{
            res.sendFile(path.join(__dirname + '/views/produtoView.html'))
        });
        app.get("/sobre_nos.html",(req,res)=>{
            res.sendFile(path.join(__dirname + '/views/sobre_nos.html'))
        });

        app.listen(4000,()=>{console.log("ta pegando");});//onde o servidor é ligado
    },
    //recebimento de dados
    Date(){
           //cadastro
        app.post("/cadastro",(req,res)=>{
            var email=req.body.email;
            var senha=req.body.senha;
            var nome=req.body.nome;
            connection.insersion(nome,email,senha);
        })
        app.post("/logim",(req,res)=>{
            var email=req.body.email;
            var senha=req.body.senha;
            console.log(email);
        })
    },
    //definição de arquivos estaticos e recebimento de dados
    Static(){
        //estaticos
        app.use(express.static("public"));

        //recebimento de dados
        app.use(bodyparse.urlencoded({extended:false}));
        app.use(bodyparse.json());
    },
    //configuração do EJS
    Set(){
        
        app.set("view engine",'ejs');

    }
}


