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
  useEffect(() => {
    if (data) {
      dispatch({ type: UPDATE_USER, payload: data });
    }
  }, [data]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState("");

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

  const handleSelect = (result) => {
    setTitle(result.title);
    setAuthor(result.author);
    setDescription(result.description);
  };

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
                  <div className="dropdown-content" key={i} onClick={() => handleSelect(result)}>
                    <h2>{result.title}</h2>
                    <p>by {result.author}</p>
                    <p>{result.description.substring(0, 10)}</p>
                  </div>
                ))}
              </div>
            )}
          </form>
          {data ? (<div className="d-flex align-items-center gap-2">
            <p>{data.data.name}</p>
            <button onClick={() => {
              dispatch(logout());
            }}>Sign Out</button>
          </div>) : <Dropdown onSelect={handleSet} />}

        </div>

      </div>
    </nav>
  );
};
