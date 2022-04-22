require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express()
const port = process.env.PORT || 2000

//middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send(`Running server at port : ${port}`)
})


app.listen(port, () => {
    console.log(`Running server at : https://localhost:${port}`)
})

