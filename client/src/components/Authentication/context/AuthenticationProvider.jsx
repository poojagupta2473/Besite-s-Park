import React, { createContext, useState, useEffect } from "react";

export const authContext = createContext(false);

const AuthenticationProvider = (props) => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;

  const [id, setId] = useState(storedUser ? storedUser.id : "");
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState(storedUser ? storedUser.name : "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ id, name }));
  }, [id, name]);

  useEffect(() => {
    const initialStoredUser = JSON.parse(localStorage.getItem("user")) || null;
    if (initialStoredUser) {
      setId(initialStoredUser.id);
      setName(initialStoredUser.name);
      setAuth(!!initialStoredUser.id);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <authContext.Provider
      value={{
        id,
        setId,
        auth,
        setAuth,
        name,
        setName,
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthenticationProvider;
