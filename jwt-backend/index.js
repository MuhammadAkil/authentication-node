const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors'); 
const secretKey = 'secretkey'
app.use(cors());

app.get("/",(req, res)=>{

    res.json({
        message:'A sample api'
    });
});


app.post('/profile',verifyToken,(req, res)=>{
    jwt.verify(req.token,secretKey,(err,userData)=>{
      if(err){
        res.send({
            result:'Invalid token'})
        }
        else{
            res.json({
                message:'Profile accessed successfully',
                userData
           })
        }
    })
});

function verifyToken(req, res,next){
const bearerHeader  = req.headers['authorization'];
if(typeof bearerHeader !='undefined' ){
    const bearer =bearerHeader.split(' ');
    const token = bearer[1];
    req.token =token;
    next();
}
else
{
    res.send({
        result:'Token is not valid'
    })
}}

app.post("/login",(req, res)=>{
const user={
    username: 'Akil Mehar',
    password:'12345678'
}
jwt.sign({user},secretKey,(err,token)=>{
res.json({
    token,
        })
    })
})


app.listen(5000,()=>{
    console.log('app is running on http://localhost:5000');
})
app.use(cors({
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
