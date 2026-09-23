// context api ko use karne ke liye sab se first rafce kar ke bolier plate bana lo uske baad {children} bana lo usse data or page show hoga uske baad 'export authDataContext' ko set kar lo and ye main bhi set karn na hoga authContext se

import React from "react";
import { createContext } from "react";
export const authDataContext = createContext();
const AuthContext = ({ children }) => {
  const serverUrl = "http://localhost:3000/";
  let value = {
    serverUrl
  };
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
};

export default AuthContext;
