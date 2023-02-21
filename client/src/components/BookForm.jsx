import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";

function BookForm({ book }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.books.books);

  const [title, setTitle] = useState(book ? book.title : '');
  const [author, setAuthor] = useState(book ? book.author : '');
  const [price, setPrice] = useState(book ? book.price : 0);
  const [image, setImage] = useState(book ? book.image : 0);
  const [description, setDescription] = useState(book ? book.description : 0);

  const handleSubmit = e => {
    e.preventDefault();

    const data = { title, author };

    if (book) {
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(updatedBook => {
          dispatch({ type: 'UPDATE_BOOK', payload: updatedBook });
        });
    } else {
      fetch('http://localhost:3000/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(newBook => {
          dispatch({ type: 'ADD_BOOK', payload: newBook });
        });
    }

    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input type="text" placeholder="Imageurl" value={image} onChange={e => setPrice(e.target.value)} />
      <textarea type="text" placeholder="Description" value={description} onChange={e => setPrice(e.target.value)} />
      <button type="submit">{book ? 'Update' : 'Add'}</button>
    </form>
  );
}

export default BookForm;
