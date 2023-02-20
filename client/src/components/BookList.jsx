import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/FetchProducts";
import Book from "./Book";
import { searchBooks, fetchBooks, deleteBook } from "../redux/Actions/books";
import Pagination from "./Pagination";

function BookList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.books);
  const [page, setPage] = useState(1);
  let data = JSON.parse(localStorage.getItem('data'));
  useEffect(()=>{
    if(data && data.length > 0) {
      dispatch({type : UPDATE_USER, payload : data});
    }
    dispatch(fetchProducts(page));
  }, [dispatch,page]);

  const handleDelete = (id) => {
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
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5">
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
