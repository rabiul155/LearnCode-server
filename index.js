const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const cources = require('./data/cources.json')


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.i4cqwjk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {

        const courcesCollection = client.db("learn-code").collection("cources")
        const enrolledCourcesCollection = client.db("learn-code").collection("enrolled")

        app.get('/cources', async (req, res) => {
            const courseId = req.query.courseId;
            const query = { courseId: courseId };
            const result = await courcesCollection.find(query).toArray()
            res.send(result);

        })

        app.get('/cource/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const cource = await courcesCollection.findOne(query)
            res.send(cource);
        })



        app.get('/premium/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const cource = await courcesCollection.findOne(query)
            res.send(cource);
        })


        app.get('/enrolled', async (req, res) => {
            const email = req.query.email;
            const query = { student: email }
            const result = await enrolledCourcesCollection.find(query).toArray()
            res.send(result);
        })

        app.post('/enrolled', async (req, res) => {
            const cource = req.body;
            const result = await enrolledCourcesCollection.insertOne(cource)
            res.send(result);
        })


        app.delete('/deleteEnrolled', async (req, res) => {
            const id = req.query.courceId;
            const query = { _id: new ObjectId(id) }
            const result = await enrolledCourcesCollection.deleteOne(query);
            res.send(result);
        })
















    }

    finally {


    }

}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('hello buddy i am your server ');
})


app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
