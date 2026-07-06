import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Setting up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// TellingNode to serve all static files (html, css, images) from
app.use(express.static('public'));

// # page routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact' });
});

app.get('/education', (req, res) => {
    res.render('education', { title: 'Education' });
});

app.get('/interest', (req, res) => {
    res.render('interest', { title: 'Interests' });
});

app.get('/project', (req, res) => {
    res.render('project', { title: 'Projects' });
});

app.get('/skill', (req, res) => {
    res.render('skill', { title: 'Skills' });
});

// Handle 404 - keep this at the end
app.use((req, res) => {
    res.status(404).send('Page not found');
})