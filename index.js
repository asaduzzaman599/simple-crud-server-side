require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');


const app = express()
const port = process.env.PORT || 2000

//middleware
app.use(cors())
app.use(express.json())

//mongoDB
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.sfale.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run = async () => {
    try {
        await client.connect()
        const connetionProductDB = client.db('product_management').collection('product');

        app.post('/product', async (req, res) => {
            const product = req.body;
            console.log(product)
            const result = await connetionProductDB.insertOne(product)
            res.send({ "result": result })
        })

        app.get('/product', async (req, res) => {
            const result = await connetionProductDB.find({}).toArray();
            res.send(result)
        })

        app.get('/product/:productId', async (req, res) => {
            const id = req.params.productId;
            const query = {
                _id: ObjectId(id)
            }
            const result = await connetionProductDB.find(query).toArray();
            res.send(result)
        })

        app.delete('/product/:productId', async (req, res) => {
            const id = req.params.productId;
            const query = {
                _id: ObjectId(id)
            }

            const result = await connetionProductDB.deleteOne(query);
            res.send(result)
        })

        app.put('/product/:productId', async (req, res) => {

            const id = req.params.productId;
            const product = req.body;

            const filter = {
                _id: ObjectId(id)
            }
            const options = { upsert: true };
            const newDocument = {
                $set: product
            };

            const result = await connetionProductDB.updateOne(filter, newDocument, options);

            console.log(result)
            res.send(result)

        })

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

