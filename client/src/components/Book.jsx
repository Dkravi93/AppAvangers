import Modal from '../helpers/modal';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
function Book(props) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { book, onDelete } = props;
  return (
    <div key={book._id} style={{ margin: "20px" }} className="col">

      {/* <Modal /> */}
      <div className="card">
        <img src={book.image} className="card-img-top" alt="image" />
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <p>Author: {book.author}</p>
          <p>Price: {book.price}</p>
        </div>
      </div>
      {
        isAuthenticated && <button onClick={() => onDelete(book._id)}>Delete</button>
      }
    </div>
  );
}

export default Book;
