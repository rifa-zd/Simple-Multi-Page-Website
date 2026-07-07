import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { MongoClient } from "mongodb";

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


//allows Express server to read n understand data sent from HTML forms.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setting up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// TellingNode to serve all static files (html, css, images) from
app.use(express.static('public'));


const MONGO_URL = "mongodb://root:admin@mongo:27017";
const client = new MongoClient(MONGO_URL);

//server start & connect
await client.connect();

// # page routes
app.get('/', async (req, res) => {
    console.log('Connected successfully  to MongoDB');

    const db = client.db("visitor_db");
    // fetching from DB
    const data = await db.collection('visitors').find({}).toArray();
    // client.close();

    res.render('index', { data });
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/submit', async (req, res) => {
    const { name, email, message } = req.body;

    console.log(req.body);

    // Insert data into MongoDB
    const db = client.db("visitor_db");
    // fetching from DB
    const data = await db.collection('visitors').insertOne({
        name,
        email,
        message,
        createdAt: new Date()
    });

    console.log(data);
    console.log("data inserted in DB");
    res.redirect('/');
})


app.get('/education', (req, res) => {
    res.render('education');
});

app.get('/interest', (req, res) => {
    res.render('interest');
});

app.get('/project', (req, res) => {
    res.render('project');
});

app.get('/skill', (req, res) => {
    res.render('skill');
});

// Handle 404 - keep this at the end
app.use((req, res) => {
    res.status(404).send('Page not found');
})

//  graceful shutdown
process.on('SIGINT', async () => {
    await client.close();
    console.log('MongoDB connection closed');
    process.exit(0);
});