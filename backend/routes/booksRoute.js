import express from 'express';
import { Book } from '../models/bookModels.js';

const router = express.Router();


router.post('/', async (request , response ) => {
     try{ 
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message:'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        } ;
        const book = await Book.create(newBook);
        
        return response.status(200).send(book);

     }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});

     }

});

// route for get all books from database

router.get('/' ,async (request,response) => {
try{
    const books = await Book.find({});
    return response.status(200).json({
        count: books.length,
        data: books,

    });

} catch(error){
    console.log(error.message);
    response.status(500).send({ message: error.message });

}});

// route for get one books from databases 
router.get('/:id' ,async (request,response) =>{
    try{
        const { id } = request.params;


         
        const book = await Book.findById(id);
        return response.status(200).json({book});
    
    } catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    
    }});

// route to update a book 

router.put('/:id',async (request , response ) => {
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){ 
            return response.status(400).send({
                message: 'send all required fields: title, author, publishYear',
            });
        }
        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({ message : 'Book not found '});
        }
        return response.status(200).send({ message:'Book updated successfully'});
    } 
        catch (error){
        console.log(error.message);
        response.status(500).send({message: error.message})

    }
});

// ROUTE TO DELETE A BOOK 

router.delete('/:id',async(request, response)=>{
    try{
    const { id } = request.params;
    
    const result = await Book.findByIdAndDelete(id);

    if(!result){
        return response.status(400).json({ message:'Book is not found '});
    }
    return response.status(200).send({message:'Book successfully deleted'});
    
    }catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message});
               
    }
});

export default router; 


