const { MongoClient, ObjectId } = require('mongodb');
const express = require("express");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
require("dotenv").config();


const DB_URI = process.env.Flash_File
const flash = new MongoClient(DB_URI);
const users = flash.db("flashfiles").collection("users")
const files = flash.db("flashfiles").collection("files")


app.get('/files', async (req, res) => {
    const response = await files.find({}).toArray()
    res.send(response)
})
app.get('/files/:id', async (req, res) => {
    const response = await files.find({ _id: ObjectId(req.params.id) }).toArray()
    res.send(response)
})



app.get('/users', async (req, res) => {
    const response = await users.find({}).toArray()
    res.send(response)
})



flash.connect(err => {
    if (err) { console.error(err); return false; }
    console.log("Database Connected")
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});
