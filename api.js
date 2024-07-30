import express from 'express';
import { moviesJSON } from './movies.js';
import crypto from 'node:crypto';
import { validateMovie, validatePartialMovie } from './scheme/movies.js';


const movies = moviesJSON;
const app = express();


app.use(express.json());

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Estoy dentro ${PORT}`);
});


app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    const { genre } = req.query;

    if (genre) {
        const filteredMovie = moviesJSON.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        );

        return res.json(filteredMovie);
    }

    res.json(moviesJSON);
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;


    const filteredMovie = moviesJSON.find(movie => movie.id === id);
    if (filteredMovie) res.send(filteredMovie);

    res.status(404).send('Movie Not Found');
});

app.post('/movies', (req, res) => {

    const result = validateMovie(req.body);

    if (result.error) res.status(400).json({ error: JSON.parse(result.error.message) });

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    };

    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body);

    if (result.error) res.status(400).json({ error: JSON.parse(result.error.message) });


    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) return res.status(404).json({ error: '404 Movie not found' });

    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data
    };

    movies[movieIndex] = updatedMovie;

    return res.json(updatedMovie);
});