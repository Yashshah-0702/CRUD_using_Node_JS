const express = require('express')
const app = express()
const body = require('body-parser')
const sequelize = require('./database/database')
const router = require('./router/router')

app.set('view engine','ejs')
app.set('views','views')

app.use(body.urlencoded({extended:false}))

app.use(router)

sequelize.sync().then((result)=>{
    app.listen(9000);
}).catch(err=>console.log(err))