const express=require("express");//exportação da biblioteca express
const app=express();
const path=require("path");
const bodyparse=require("body-parser");
const connection=require("./database/Usuario/usuario");//conexão com banco de dados
const image=require("./database/database/teste");
const multer=require("multer");
const req = require("express/lib/request");
const upload=multer({dest:"public/uploads/"});
const fss=require("fs");
const { call } = require("body-parser");

const categoria=["Casa","Madeira","Banheiro","Tinta"];

module.exports={
    //definição de rotas e ligação do servidor
    conect(){
        
       app.get("/",(req,res)=>{
            image.findAll({raw:true}).then(tabela=>{
                res.render("../views/pagMain",{
                    tabel:tabela,
                })
            });
        });
        app.get("/login.ejs",(req,res)=>{
            res.render("../views/login");
        });
        app.get("/cadrastoUsuario.ejs",(req,res)=>{
            res.render("../views/cadrastoUsuario");
        });
        app.get("/produtos.ejs",(req,res)=>{
            res.render("../views/produtos");
        });
        app.get("/produtoView.ejs",(req,res)=>{
            res.render("../views/produtoView");
        });
        app.get("/sobre_nos.ejs",(req,res)=>{
            res.render("../views/sobre_nos");
        });
        app.get("/cadastroProduto.ejs",(req,res)=>{
            res.render("../views/cadastroProduto",{
                list:categoria
            });
        });
        app.get("/perfil.ejs",(req,res)=>{
            res.render("../views/perfil");
        });
        app.get("/categorias.ejs",(req,res)=>{
            res.render("../views/categorias",{
                list:categoria
            });
        });
        app.get("/cadastroCategoria.ejs",(req,res)=>{
            res.render("../views/cadastroCategoria");
        });
        app.get("/listacategorias.ejs",(req,res)=>{
            res.render("../views/listacategorias");
        });

        app.listen(process.env.PORT || 4000,()=>{console.log("ta pegando");});//onde o servidor é ligado
    },
    //recebimento de dados
    Date(){
           //cadastro
        app.post("/cadastro",(req,res)=>{
            var email=req.body.email;
            var senha=req.body.senha;
            var nome=req.body.nome;
            connection.create({
                nome:nome,
                senha:senha,
                email:email
            }).then(()=>{
                res.redirect("/");
            }
            )
        })
        app.post("/logim",(req,res)=>{
            var email=req.body.email;
            var senha=req.body.senha;
            connection.findOne({
                where:{
                    email: email,
                    senha: senha
                }
            }).then((connection)=>{
                if(connection!=undefined){
                    res.redirect("/");
                }else{
                    res.render("login");
                }
            })
        })
        app.post("/produto",upload.single('imagem'),(req,res)=>{
            const {filename,size}=req.file;

            image.create({
                name:req.body.nome,
                image:filename,
                marca:req.body.marca,
                categoria:req.body.categoria,
                quantidade:req.body.quantidade,
                des:req.body.descricao
            }).then(()=>{
                image.findAll().then(tabela=>{
                    res.render("../views/pagMain",{
                        tabel:tabela
                    });
                });
            })

        })
        app.post("/produtopag",(req,res)=>{
            let Id=req.body.send;
            image.findOne({
                where:{
                    id:Id
                }
            }).then(tabel=>{
                res.render("../views/produtoView",{
                    tabels:tabel
                });
            });
        });
        app.post("/excluir",(req,res)=>{
            let mod=req.body.apagar;
            let nome=req.body.imagem;
            let tipo=req.body.edit;
            let salvar=req.body.salvar;
            let save=req.body.save;
            //fss.unlink('./public/uploads/'+nome);
            if(salvar=="salvar"){
                
                let valores={
                name:req.body.nome,
                marca:req.body.marca,
                quantidade:req.body.quantidade,
                des:req.body.descricao
                }
                image.update(valores,{where:{
                    id:save
                }}).then(()=>{
                    image.findAll({raw:true}).then(tabela=>{
                        res.render("../views/pagMain",{
                            tabel:tabela
                        });
                })
            });
            }else{
                if(mod){
                    image.destroy({
                        where:{
                            id:mod
                        }
                    }).then(()=>{
                        image.findAll({raw:true}).then(tabela=>{
                            res.render("../views/pagMain",{
                                tabel:tabela
                            });
                    })
                })
                }else{
                    image.findAll({raw:true}).then(tabela=>{
                        res.render("../views/pagMain",{
                            tabel:tabela
                        });
                     })
                }
            
        }
        });
        app.post("/categorias",(req,res)=>{
            let categ=req.body.categoria;
            image.findAll({
                where:{
                    categoria:categ
                }
            }).then(tabela=>{
                res.render("../views/listacategorias",{
                    tabel:tabela
                });
            });
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


