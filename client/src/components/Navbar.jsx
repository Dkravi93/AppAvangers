import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../redux/Actions/books";
import { logout, UPDATE_USER } from "../redux/Actions/auth";
import { isAuthenticated } from "../redux/Actions/auth";
import Dropdown from "./DropDown";


export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const books = useSelector(state => state.books.books);
  let data = JSON.parse(localStorage.getItem('data')) || null;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const cart = useSelector(state => state.cart.items);
  const [out, setOut]  = useState(true);
  const handleSet = (event) => {
    setSelectedOption(event.target.getAttribute("value"));
  };
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const results = books.filter(obj => {
      return obj.title.toLowerCase().includes(searchValue) || obj.author.toLowerCase().includes(searchValue) || obj.description.toLowerCase().includes(searchValue);
    });
    searchValue.length === 0 ? setSearchResults("") : setSearchResults(results);
  };

  const handleLogout = () => {
    localStorage.setItem("data", null);
    data = null;
    dispatch(logout());
    setOut(!out);
  }
  useEffect(() => {
    if (data) {
      dispatch({ type: UPDATE_USER, payload: data });
    }
  }, [data,out]);

  return (
    <nav style={{ position: "sticky", backgroundColor: "white", top: "0px", zIndex: "2", margin: "auto", padding: "10px", width: "100%" }}>
      <div className="dropdown" >
        <div style={{ display: "flex", position: "relative", justifyContent: "space-between", gap: "10px", alignItems: "center" }} >
          <div onClick={() => navigate("/")}>
            <img src="https://d2g9wbak88g7ch.cloudfront.net/staticimages/logo-new.png" alt="logo" />
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                dispatch(
                  searchBooks(e.target.value)
                );
                handleSearch(e)
              }}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
            {searchResults.length > 0 && (
              <div className="search-container">
                {searchResults.map((result, i) => (
                  <div className="dropdown-content" key={i}>
                    <h2>{result.title}</h2>
                    <p>by {result.author}</p>
                    <p>{result.description.substring(0, 10)}</p>
                  </div>
                ))}
              </div>
            )}
          </form>
          {data ? (<div className="d-flex align-items-center gap-2">
            <p>Welcome, {data.data.name}</p>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Sign Out</button>
          </div>) : <Dropdown onSelect={handleSet} />}
          {data && <div>Cart : {cart.length}</div>}
        </div>
      </div>
    </nav>
  );
};
