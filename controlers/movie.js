import { MovieModel } from '../models/movie.js';
import { validateMovie, validatePartialMovie } from '../scheme/movies.js';

export class MovieController {
    static async getAll (req, res) {
        res.header('Access-Control-Allow-Origin', 'http://localhost:8080');

        const { genre } = req.params;

        const movies = await MovieModel.getAll({ genre });

        res.json(movies);
    }

    static async getById (req, res) {
        const { id } = req.params;

        const movie = await MovieModel.getById({ id });

        if (!movie) res.status(404).json({ message: 'Movie not found' });

        res.json(movie);

    }

    static async create (req, res) {

        const result = validateMovie(req.body);

        if (result.error) res.status(400).json({ error: JSON.parse(result.error.message) });

        const newMovie = await MovieModel.create(result);

        res.status(201).json(newMovie);
    }

    static async update (req, res) {
        const result = validatePartialMovie(req.body);

        if (result.error) res.status(400).json({ error: JSON.parse(result.error.message) });

        const { id } = req.params;



        const updatedMovie = await MovieModel.patch({ id, input: result });



        if (!updatedMovie) return res.status(404).json({ message: 'Movie not found' });

        res.json(updatedMovie);



    }
}