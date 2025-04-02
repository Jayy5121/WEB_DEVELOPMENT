const express = require('express')
const app = express()
const port = 3000
const bodyparser=require('body-parser')
require('dotenv').config()
console.log(process.env.MONGO_URI)
const { MongoClient } = require('mongodb');
app.use(bodyparser.json())
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const cors=require('cors')
// Database Name
app.use(cors())
const dbName = 'PasswordManager';
client.connect();


app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
    
})

app.post('/', async (req, res) => {
    const password =req.body;
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.insertOne(password);
    res.send({success:true,result:findResult})
    
})


app.delete('/', async (req, res) => {
    const password =req.body;
    const db = client.db(dbName);
    const collection = db.collection('password');
    const findResult = await collection.deleteOne(password);
    res.send({success:true,result:findResult})
    
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})