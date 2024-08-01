import { getJSON } from '../getJSON.js';
import crypto from 'node:crypto';

const movies = getJSON('./movies.json');

export class MovieModel {
    static async getAll ({ genre }) {
        if (genre) {
            return movies.filter(
                movie => movie.genre(g => g.toLowerCase() === genre.toLowerCase())
            );
        }
        return movies;
    }

    static async getById ({ id }) {
        const filteredMovie = movies.find(movie => movie.id === id);

        return filteredMovie;
    }

    static async create (input) {
        const newMovie = {
            id: crypto.randomUUID(),
            ...input
        };

        movies.push(newMovie);

        return newMovie;
    }

    static async patch ({ id, input }) {

        const movieIndex = movies.findIndex(movie => movie.id === id);

        if (movieIndex === -1) return null;

        const updatedMovie = {
            ...movies[movieIndex],
            ...input.data
        };

        movies.splice(movieIndex, 1);

        movies.push(updatedMovie);

        console.log(movies);

        return updatedMovie;

    }
}