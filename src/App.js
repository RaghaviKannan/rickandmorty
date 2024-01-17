import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterDetails from "./components/CharacterDetails";
import CharacterList from "./components/CharacterList";
import "./App.css";

export const API_URL = "https://rickandmortyapi.com/api/character";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setCharacters(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError("Error fetching characters. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <CharacterList
                characters={characters}
                loading={loading}
                error={error}
              />
            }
          />
          <Route path="/characters/:id" element={<CharacterDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
