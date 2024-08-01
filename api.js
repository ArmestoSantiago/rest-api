import express from 'express';
import { moviesRouter } from './routes/movies.js';


const app = express();

app.use(express.json());

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Estoy dentro ${PORT}`);
});


app.use('/movies', moviesRouter);

// app.get('/movies', );

// app.get('/movies/:id',);

// app.post('/movies',);

// app.patch('/movies/:id',);