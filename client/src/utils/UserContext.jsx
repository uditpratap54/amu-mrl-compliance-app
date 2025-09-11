// client/src/utils/UserContext.js
// Context to mock user auth state for demo

import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const setUserWithLogging = (userData) => {
    console.log('UserContext: Setting user to:', userData);
    setUser(userData);
  };
  
  console.log('UserContext: Current user:', user);
  
  return <UserContext.Provider value={{ user, setUser: setUserWithLogging }}>{children}</UserContext.Provider>;
};
