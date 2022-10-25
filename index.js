const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors())


const cources = require('./data/cources.json')

app.get('/', (req, res) => {
    res.send('hello buddy i am your server ');
})

app.get('/cources', (req, res) => {
    res.send(cources);
})



app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
