const express=require("express");//exportação da biblioteca express
const app=express();
const path=require("path");
const bodyparse=require("body-parser");
const connection=require("./database/Usuario/usuario");//conexão com banco de dados
const produto=require("./database/database/produto");
const multer=require("multer");
const req = require("express/lib/request");
const upload=multer({dest:"public/uploads/"});
const fss=require("fs");
const { call } = require("body-parser");
const categoria=require("./database/categoria/categoria");
const console = require("console");
const possui=require("./database/categoria/possui");
const { Json } = require("sequelize/dist/lib/utils");



module.exports={
    //definição de rotas{e ligação do servidor
    conect(){
        
       app.get("/",(req,res)=>{
            produto.findAll({raw:true,}).then(tabela=>{
                res.render("../views/pagMain",{
                    tabel:tabela,
                });
            })
            .catch(err=>{
                console.log(err);
            })
              
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
            categoria.findAll({raw:true}).then(tabela=>{
            res.render("../views/cadastroProduto",{
                list:tabela,
            });
        });
        });
        app.get("/perfil.ejs",(req,res)=>{
            res.render("../views/perfil");
        });
        app.get("/categorias.ejs",(req,res)=>{
                categoria.findAll({raw:true}).then(tabela=>{
                    res.render("../views/categorias",{
                        list:tabela
                    });
                })
                .catch((err)=>{
                    console.log(err);
                })
        });
        app.get("/cadastroCategoria.ejs",(req,res)=>{
            categoria.max('id').then(number=>{
            res.render("../views/cadastroCategoria",{
                numb:(number+1)
            }
            );
        })
        });
        app.get("/listacategorias.ejs",(req,res)=>{
            res.render("../views/listacategorias");
        });

        app.listen(process.env.PORT || 4000,()=>{console.log("ta pegando");})//onde o servidor é ligado
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
            let id=req.body.id;
            console.log(id);
            let lista=[...new Set(req.body.d)]
            console.log(lista);
            produto.create({
                name:req.body.nome,
                image:filename,
                marca:req.body.marca,
                quantidade:req.body.quantidade,
                des:req.body.descricao
            }).then(table=>{    
                for(let i=0;i<lista.length;i++){
                    possui.create({
                        idcategoria:lista[i],
                        idproduto:table.id  
                    }).then((tabela)=>{console.log(tabela)})
                                   .catch(err=>{console.log(err)})
                }
                res.redirect("/");
            })

        })
        app.post("/produtopag",(req,res)=>{
            let Id=req.body.send;   
            produto.findAll({
                where:{
                    id:Id
                },
                include:[{
                    model:possui,
                    include:[{model:categoria}]
                }],
            }).then(tabel=>{
                res.render("../views/produtoView",{
                    tabels:tabel
                })
            }) 
            .catch(err=>{
                 console.log(err);
             })
        });
        app.post("/excluir",async (req,res)=>{
            let mod=req.body.apagar;
            let salvar=req.body.salvar;
            let save=req.body.save;
            let quantidade=parseInt(req.body.quantidade);

            if(salvar=="salvar"){
                console.log(save);
                produto.update({
                    name:req.body.nome,
                    marca:req.body.marca,
                    quantidade:req.body.quantidade,
                    des:req.body.descricao
                    },{
                    where:{
                        id:req.body.id
                }}).then((tabel)=>{
                    console.log(tabel);
                    produto.findAll({raw:true}).then(tabela=>{
                        res.render("../views/pagMain",{
                            tabel:tabela
                        });
                })
            
            })
            .catch(err=>{
                console.log(err);
            })
            }else{
                if(mod){
                    produto.destroy({
                        where:{
                            id:mod
                        },
                        include:[{model:possui}]
                    }).then(()=>{
                        produto.findAll({raw:true}).then(tabela=>{
                            res.render("../views/pagMain",{
                                tabel:tabela
                            });
                    })
                })
                }else{
                    produto.findAll({raw:true}).then(tabela=>{
                        res.render("../views/pagMain",{
                            tabel:tabela
                        });
                     })
                }
            
        }
        });
        app.post("/categorias",(req,res)=>{

            let modo=req.body.sumido;

                let id=req.body.catego;
                categoria.findAll({
                    where:{
                        id:id
                    },
                    include:[{
                        model:possui,
                        include:[{model:produto}]
                    }]
                    
                }
                ).then(tabela=>{
                    res.render("../views/listacategorias",{
                        tabel:tabela
                    }) 
                })
                .catch(err=>{console.log(err)})
                
        });
        app.post("/pagcategoria",(req,res)=>{
                let categ=req.body.categoria;
                if(categ!=undefined){
                categoria.findOne({
                    where:{
                        id:categ
                    }
                }).then(tabela=>{
                    res.render("../views/categoriaView",{
                        tabela:tabela
                    });
                })
            }else{
                console.log(categ);
            }
        })
        app.post("/excluircategoria",(req,res)=>{
            let idcategoria=req.body.idcategoria;
            categoria.destroy({
                where:{
                    id:idcategoria
                },
                include:[{model:possui}]
            }).then(()=>{
                categoria.findAll({raw:true}).then(tabela=>{
                    res.render("../views/categorias",{
                        list:tabela
                    });
                })
                .catch((err)=>{
                    console.log(err);
                })
            })
        })
        app.post("/excluirdacateg",(req,res)=>{
            let categ=req.body.produto;
            let produto=req.body.id;
            if(categ!=undefined){
            possui.destroy({
                where:{
                    idproduto:categ,
                    idcategoria:produto
                }
            }).then((tabel)=>{
                console.log(tabel)
                categoria.findAll({
                    where:{
                        id:req.body.id
                    },
                    include:[{
                        model:possui,
                        include:[{model:produto}]
                    }]
                    
                }
                ).then(tabela=>{
                    res.render("../views/listacategorias",{
                        tabel:tabela
                    }) 
                })
            })
        }else{
            console.log(categ);
        }
    })
        app.post("/editarcateg",(req,res)=>{
            categoria.update({
                nome:req.body.nome,
                des:req.body.descricao
            },{
                where:{
                    id:req.body.id
                }
            }).then(()=>{
                categoria.findAll({raw:true}).then(tabela=>{
                    res.render("../views/categorias",{
                        list:tabela
                    });
                 })})
               .catch((err)=>{
                    console.log(err);
               })
        
        })
        app.post("/possui",(req,res)=>{
            categoria.create({
                nome:req.body.name,
                des:req.body.descricao
            }).then(()=>{
                res.redirect("/categorias.ejs");
            })
            .catch(err=>{console.log(err)})
        });
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


