const { Sequelize } = require('sequelize');
const sequelize  = require('../config/database')

const client = sequelize.define('client',{
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    password:{
        type: Sequelize.STRING
    }
})

client.sync({ alter: true }).then(()=>console.log("table created"))
            .catch(err=>console.log(err))

module.exports = client