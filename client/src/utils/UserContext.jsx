// client/src/utils/UserContext.js
// Context to mock user auth state for demo

import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
