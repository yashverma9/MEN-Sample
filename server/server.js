//import express from "express";
//import mongoose from "mongoose"

const express = require('express'); 
const mongoose = require('mongoose');
const data  = require('./data.js');
const sampleData  = require('./dbModel.js');



//App Config
const app = express();
const port = 8081;


//Middleware
app.use(express.json());
/*
//Used during deployement on Heroku
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
});
*/
//DB Config
const connection_url = "mongodb+srv://admin:admin@cluster0.ia3lg.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//APIs

//Send Hello
app.get('/', (req, res) => res.status(200).send("Hello guys, this is test API!"));

//Send data in variable imported from another file 
app.get('/getSampleData', (req, res) => res.status(200).send(data));

//Post data to MongoDB
app.post('/postData', (req, res) => {
    const dataInput = req.body;
    
    sampleData.create(dataInput, (err, data) => {
        if(err) {
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    });
});

//Get data from MongoDB
app.get('/getData', (req, res) => {
    sampleData.find({}, (err, data) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }

    });

});

//Query records using field
app.get('/getRecord', (req, res) => {
    name = req.body.name;
    sampleData.find({'name' : name}, 'name phNo email', (err, data) =>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
});

});



//Listen
app.listen(port, () => console.log(`Listening on port number ${port}`)) // Only works with back ticks (variable using ${} notation)



