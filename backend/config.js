import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5555;
export const SERVER_URL = "http://51.20.183.228:5173";


export const mongoDBURL = `mongodb+srv://BookStore:theforbes21234@bookcluster.fxlec.mongodb.net/?retryWrites=true&w=majority&appName=Bookcluster`