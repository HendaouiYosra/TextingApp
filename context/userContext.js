import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the User Context
const UserContext = createContext();

// Custom hook to access the current user ID
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider to wrap your app and provide the current user ID
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);


  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
