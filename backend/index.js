import express from "express";
import { PORT,mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';

const app = express();
//Need to create http route using express 
app.use(express.json());

// CORS configuration to allow both localhost and IP address
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://51.20.183.228:5173'],  // Allow both origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

/*
app.post('/books', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publisYear
        ) {
            return response.status(400).send({
                message:'Send all required fields : title , author , publishYear',

        });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            
        };


        const book = await Book.create(newBook);

        return response.status(201).send(book);
    }catch (error) {
            console.log(error.message);
            response.status(500).send({message: error.message })
        }
    }
);
*/
app.get('/',(request , response) => {  //() => {} is a call back function used to handle the request 
    console.log('Root endpoint hit');
    return response.status(234).send('Welcome to Mern Stack Tutorial')
});

app.use('/books', booksRoute);

console.log('Attempting to connect to MongoDB...');
console.log('Connection URL:', mongoDBURL);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('Successfully connected to MongoDB database');
    app.listen(PORT, '0.0.0.0', () => {  // Using 0.0.0.0 to listen on all interfaces
        console.log(`Server is running on http://51.20.183.228:${PORT}`);
    });
})
.catch((error) =>{
    console.error('MongoDB connection error:', error.message);
    console.error('Full error:', error);
});

