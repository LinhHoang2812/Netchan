import { useContext, useState } from "react";
import { createContext } from "react";

const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);

const AppContext = ({ children }) => {
  const [displaySearch, setSearch] = useState(false);

  return (
    <globalContext.Provider value={{ displaySearch, setSearch }}>
      {children}
    </globalContext.Provider>
  );
};

export default AppContext;
