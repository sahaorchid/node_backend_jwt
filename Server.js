const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bodyParser  = require('body-parser')
const sequelize  = require('./config/Database')
const client = require('./models/User')

async function check(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
check()

const app = express()
app.use(cors())
app.use(cors())
app.use(bodyParser.json());

app.get('/',verifyToken,(req,res)=>{
    jwt.verify(req.token,"mySecreatKey",(err,data)=>{
        if(err){
            res.status(403).json({msg: "error"})
        }else{
            res.json(data)
        }
    })
})

app.post('/login',(req,res)=>{
    console.log(req.body)
    const { email,password } = req.body
    client.findAll({
        where: {
            email: email,
            password: password
        }
      })
      .then(user=>{
         console.log(user) 
        if(user.length!=0){
            jwt.sign({ user },"mySecreatKey",(err,token)=> {
    
                res.json({
                token 
                })
            })
        }else{
            res.json({ msg: "invalid credential"})
        }})
        .catch(err=>console.log(err))

})

function verifyToken(req,res,next){
    const token  = req.headers['authorization']
    if(typeof token !=='undefined'){
        req.token = token
        next()
    }else{
        res.status(403).json({msg:"errorrr"})
    }

}

app.listen(5000,()=>console.log('server setarted'))