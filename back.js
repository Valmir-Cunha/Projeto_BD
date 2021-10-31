const express=require("express");
const app=express();
const path=require("path");

app.set("view engine",'ejs');
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("pagMain");
});
app.get("/login.html",(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/login.html'))
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


app.listen(4000,()=>{console.log("ta pegando");});
