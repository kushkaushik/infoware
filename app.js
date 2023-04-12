const express = require("express")
const app = express();
const config = require('dotenv');
const {mongoose } = require("mongoose");
config.config({path:"./config/config.env"})
const {URI} = require('./db')

mongoose.connect(URI)
mongoose.connection.on('connected',()=>{
    console.log("Successfully connected with database")
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
require('./schema/userData')
app.use(require('./router/myRoute'))


app.listen(process.env.PORT,()=>{
    console.log(`server connected to ${process.env.PORT}`)
})