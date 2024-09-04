// UserContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../service/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create a Context for the user
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user data (simulate API call)
  const fetchUser = async () => {
    try {
      // Simulate an API call
      const loggedInUser = await AsyncStorage.getItem("loggedInUser");
      setUser(loggedInUser);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user data on component mount
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using user context
export const useUser = () => useContext(UserContext);
