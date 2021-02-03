import React, { useState, createContext } from 'react';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
    
    const [restaurants, setRestaurants] = useState([])
    const [selectedRestaurant, setSelectedRestaurant] = useState(null)

    const addRestaurants = (newRestaurant) => {
        setRestaurants([...restaurants, newRestaurant])
    }

    const value = {
        restaurants,
        setRestaurants,
        addRestaurants,
        selectedRestaurant,
        setSelectedRestaurant
    }
    return (
        <RestaurantsContext.Provider value={value}>
            {children}
        </RestaurantsContext.Provider>
    )

}