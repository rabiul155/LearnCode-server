const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;

app.use(cors())

app.get('/', (req, res) => {
    res.send('hello buddy i am your server ');

})

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
