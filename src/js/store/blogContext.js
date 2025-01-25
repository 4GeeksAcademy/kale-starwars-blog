import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (item) => {
    if (!favorites.find((fav) => fav.uid === item.uid)) {
      setFavorites([...favorites, item]);
    }
  };

  const removeFavorite = (uid) => {
    setFavorites(favorites.filter((fav) => fav.uid !== uid));
  };

  return (
    <AppContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
