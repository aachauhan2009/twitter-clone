import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const Context = createContext();

export default function UserProvider(props) {
  const [user, setUser] = useState();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);
  return (
    <Context.Provider value={{ user, setUser }}>
      {props.children}
    </Context.Provider>
  );
}

export const useUser = () => {
  const { user } = useContext(Context);
  return user;
}

export const useSetUser = () => {
  const { setUser } = useContext(Context);
  return useCallback((user) => {
    if(user === null) {
      localStorage.removeItem("user")
    } else {
      localStorage.setItem("user", JSON.stringify(user));
    }
    setUser(user)
  }, [setUser]);
};