import React, { createContext, useReducer } from 'react';

const initialState = {
    people: [],
    planets: [],
    vehicles: [],
    favorites: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return { ...state, [action.payload.category]: action.payload.data };
        case 'TOGGLE_FAVORITE':
            const isFavorite = state.favorites.find(fav => fav.id === action.payload.id);
            return {
                ...state,
                favorites: isFavorite
                    ? state.favorites.filter(fav => fav.id !== action.payload.id)
                    : [...state.favorites, action.payload]
            };
        default:
            return state;
    }
};

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};
