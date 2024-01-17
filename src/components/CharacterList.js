import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CharacterList.css";

const AnimatedHeading = () => {
  const headingText = "Rick and Morty Characters!";
  const [displayedHeading, setDisplayedHeading] = useState("");
  const [index, setIndex] = useState(0);
  const [isDancing, setIsDancing] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (index === headingText.length) {
        clearInterval(intervalId);
        setIsDancing(true);
      } else {
        setDisplayedHeading((prevHeading) => prevHeading + headingText[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }
    }, 150);

    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <h1 className={`animated-heading ${isDancing ? "dance" : ""}`}>
      {displayedHeading}
    </h1>
  );
};

const Loading = () => <div>Loading...</div>;

const Error = ({ message }) => <div>{message}</div>;

const CharacterList = ({ characters, loading, error }) => (
  <div>
    <AnimatedHeading />
    {loading && <Loading />}
    {error && <Error message={error} />}
    <ul>
      {characters.map((character) => (
        <li key={character.id}>
          <Link to={`/characters/${character.id}`}>
            <img src={character.image} alt={character.name} />
            {character.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default CharacterList;
