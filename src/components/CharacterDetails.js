import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CharacterDetails.css";
import { API_URL } from "../App";

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setCharacter(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching character details:", error);
        setError("Error fetching character details. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const { name, image, status, species, gender, origin, location, created } =
    character || {};

  return (
    <div className="CharacterDetails">
      <h1 className="character-name">{name}</h1>
      <img src={image} alt={name} className="character-image" />

      <div className="character-info">
        <strong>Status:</strong> {status}
      </div>
      <div className="character-info">
        <strong>Species:</strong> {species}
      </div>
      <div className="character-info">
        <strong>Gender:</strong> {gender}
      </div>
      <div className="character-info">
        <strong>Origin:</strong> {origin && origin.name}
      </div>
      <div className="character-info">
        <strong>Location:</strong> {location && location.name}
      </div>
      {created && (
        <div className="character-info">
          <strong>Created on:</strong> {new Date(created).toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default CharacterDetails;
