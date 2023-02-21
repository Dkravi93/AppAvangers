import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/FetchProducts";
import Book from "./Book";
import { searchBooks, fetchBooks, deleteBook } from "../redux/Actions/books";
import Pagination from "./Pagination";
import { removeItem } from "../redux/Actions/cart";

function BookList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.books);
  const userData = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart.items);
  const [page, setPage] = useState(1);
  let data = JSON.parse(localStorage.getItem('data'));
  useEffect(()=>{
    var subscription = true;
    if(data && data.length > 0) {
      dispatch({type : UPDATE_USER, payload : data});
    }
    dispatch(fetchProducts(page));
    return () => {
      subscription = false;
    }
  }, [page]);
  useEffect(()=> {
    var subscribe = true;
    return () => {
      subscribe = false;
    }
  },[userData])

  const handleDelete = (id) => {
    let filtered = cart.filter((el => el._id === id)) || 0;
    if(filtered.length > 0) {
      dispatch(removeItem(id));
    }
    console.log(id);
    fetch(`http://localhost:3000/api/books/${id}`, {
      method: "DELETE",
    }).then(() => {
      dispatch(deleteBook(id));
    });
  };

  return (
    <>
      {products.loading ? (
        <p>Loading products...</p>
      ) : products.error ? (
        <p>{products.error}</p>
      ) : (
        <div>
          <div className="container">
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 row-col-lg-5">
              {products.books
                .map((el) => {
                  return (
                    <Book key={el._id} book={el} onDelete={handleDelete} />
                  );
                })}
            </div>
          </div>
          <Pagination setPage={setPage} page={page}/>
        </div>
      )}
    </>
  );
}

export default BookList;
