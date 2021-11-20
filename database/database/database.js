const Sequelize = require('sequelize');

const sequelize = new Sequelize({ 
    database: "d56ogem5ol5oho",
    username: "tzphiihxmvxgjd",
    password: "382551594af6f4b22a56e6f66fec33543334d01ace810b86487c99358ccd55d1",
    host: "ec2-107-20-24-247.compute-1.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
    ssl: {
        require: true,
        rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
}
});


sequelize
        .authenticate()
        .then(()=>{console.log("entrou\n");})
        .catch((err)=>{console.log(err);})


module.exports=sequelize;