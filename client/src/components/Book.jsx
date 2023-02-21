import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../redux/Actions/auth';
import { useDispatch } from 'react-redux';
import { addItem, updateItem, removeItem } from '../redux/Actions/cart';
import BookForm from './BookForm';
function Book(props) {
  const { book, onDelete } = props;
  const [edit, setEdit] = useState(false);
  const [qty, setQty] = useState(0);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addItem({ ...book, quantity: 1 }));
    setQty(qty + 1);
  };
  const handleUpdateCart = (change) => {
    setQty(el => el + change);
    // (qty === 0) ? dispatch(removeItem(book._id)) : dispatch(updateItem({ ...book, quantity: (qty + change) }));
  }
  useEffect(() => {
    (qty === 0) ? dispatch(removeItem(book._id)) : dispatch(updateItem({ ...book, quantity: qty }));
  }, [qty])

  return (
    <div key={book._id} style={{ margin: "10px" }} className="col">
      {edit ?
        <BookForm book={book} /> : (
          <div className="card">
            <img src={book.image} className="card-img-top" height={100} alt="image" />
            <div className="card-body">
              <span className='d-flex justify-content-space-between gap-5'>
              <h5 className="card-title">{book.title}</h5>
              <img onClick={() => setEdit(!edit)} width={20} height={20} src="https://www.freeiconspng.com/thumbs/edit-icon-png/edit-editor-pen-pencil-write-icon--4.png" alt="edit" />
              </span>
              <p>Author: {book.author}</p>
              <p>Price: ₹ {book.price}</p>
            </div>
            {
              isAuthenticated() && <div className='d-flex flex-direction-column align-items-center gap-2'>
                <button className="btn btn-outline-danger" onClick={() => onDelete(book._id)}>Delete</button>
                {qty === 0 ? <button className="btn btn-outline-success" onClick={handleAddToCart}>Add to cart</button> : (<div className='d-flex align-items-center gap-2'>
                  <button className="btn btn-outline-success" disabled={qty === 0 ? true : false} onClick={() => handleUpdateCart(-1)}>-</button><p>{qty}</p><button className="btn btn-outline-success" onClick={() => handleUpdateCart(1)}>+</button>
                </div>)}
              </div>
            }
          </div>
        )}
    </div>
  );
}

export default Book;

