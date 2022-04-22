require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express()
const port = process.env.PORT || 2000

//middleware
app.use(cors())
app.use(express.json())

//mongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.sfale.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        await client.connect()
        const productDBConnettion = client.db('product_management').collection('product');

        console.log("Database Connected")

    } catch (error) {
        console.dir(error)
    } finally {
        console.log('')
    }
}

run().catch(console.dir)

/* 
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */




app.get('/', (req, res) => {
    res.send(`Running server at port : ${port}`)
})


app.listen(port, () => {
    console.log(`Running server at : https://localhost:${port}`)
})

