import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4"
      initial={{ backgroundColor: "#C1E899" }}
      animate={{
        backgroundColor: [ "#94DEA5", "#55883B","#C1E899"],
      }}
      transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative bg-[#97BC62] text-gray-900 p-6 rounded-2xl shadow-2xl max-w-lg text-center overflow-hidden border-4 border-[#1c2a18]"
      >
        <h2 className="text-2xl font-bold mb-4 relative z-10">
          Quote of the Day
        </h2>
        <motion.h3
          className="text-lg italic relative z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          "{quote}"
        </motion.h3>
        <p className="mt-2 text-gray-700 relative z-10">- {author}</p>
        <div className="flex gap-4 mt-6 relative z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={fetchQuote}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg"
          >
            Next Quote
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={saveFavorite}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg"
          >
            Save to Favorites
          </motion.button>
        </div>
      </motion.div>
      <div className="mt-8 w-full max-w-lg">
        <h3 className="text-xl font-semibold text-gray-900">Favorites</h3>
        <ul className="mt-4 space-y-2">
          {favorites.map((fav, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-[#97BC62] text-gray-900 p-4 rounded-lg shadow-md flex justify-between items-center border-4 border-[#1E4D2B]"
            >
              <span>
                "{fav.quote}" - {fav.author}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteFavorite(index)}
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg"
              >
                Delete
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default QuotesApp;
