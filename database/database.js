const pg=require('pg');

const connection=new pg.Client({
    password: "382551594af6f4b22a56e6f66fec33543334d01ace810b86487c99358ccd55d1",
    user: 'tzphiihxmvxgjd',
    database: "d56ogem5ol5oho",
    port: '5432',
    host: "ec2-107-20-24-247.compute-1.amazonaws.com",
    ssl:  { rejectUnauthorized: false }
});



module.exports=connection;