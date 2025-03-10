import React, { useEffect, useState } from "react";

const QuotesApp = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "hm90Tul9q9Pups8LCHWokg==KplMlsCHY43vC4ME" },
      });
      const data = await response.json();
      setQuote(data[0].quote);
      setAuthor(data[0].author);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const saveFavorite = () => {
    const newFavorite = { quote, author };
    const updatedFavorites = [...favorites, newFavorite];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const deleteFavorite = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h2>Quote of the Day</h2>
      <h3>"{quote}"</h3>
      <p>- {author}</p>
      <button onClick={fetchQuote}>Next Quote</button>
      <button onClick={saveFavorite}>Save to Favorites</button>
      <h3>Favorites</h3>
      <ul>
        {favorites.map((fav, index) => (
          <li key={index}>
            "{fav.quote}" - {fav.author}
            <button onClick={() => deleteFavorite(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuotesApp;
