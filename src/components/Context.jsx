import React, { createContext, useState } from "react";

const UserContext = createContext();

/**
 * This is a context provider for user related data.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {ReactNode} props.children - The child components or elements.
 *
 * @returns {JSX.Element} Returns a UserContext.Provider element which wraps the child components or elements.
 */
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    venueManager: false,
    token: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
