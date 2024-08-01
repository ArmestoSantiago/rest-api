import { Router } from 'express';
import { validateMovie, validatePartialMovie } from '../scheme/movies.js';
import { MovieModel } from '../models/movie.js';
import { MovieController } from '../controlers/movie.js';



export const moviesRouter = Router();

moviesRouter.get('/', MovieController.getAll);

moviesRouter.get('/:id', MovieController.getById);

moviesRouter.post('/', MovieController.create);

moviesRouter.patch('/:id', MovieController.update);