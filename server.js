const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv = require('dotenv').config({path:'./process.env'});

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('tmp'))

app.listen(5100,()=>{
    console.log('server started')
})

const authRoute = require('./routes/auth.routes') 
app.use(authRoute)

const surveyRoute = require('./routes/survey.routes')
app.use(surveyRoute)

mongoose.connect(process.env.DATABASE);

const db=mongoose.connection;
db.on('open',()=>{
    console.log('Connection to database successful');
});
db.on('error',()=>{
    console.log('Connection with database failed');
});