import React from "react";
import{Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import CreateBook from './page/CreateBooks';
import EditBook from './page/EditBook';
import DeleteBook from './page/DeleteBook';
import ShowBook from "./page/ShowBook";
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/books/create' element={<CreateBook />}/>
      <Route path='/books/detail/:id' element={<ShowBook />}/>
      <Route path='/books/edit/:id' element={<EditBook />}/>
      <Route path='/books/delete/:id' element={<DeleteBook />}/>
    </Routes>
  );
};

 
export default App