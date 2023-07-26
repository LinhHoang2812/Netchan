import { useContext, useState } from "react";
import { createContext } from "react";
import { isMobile } from "detect-touch-device";
const globalContext = createContext();

export const useGlobalContext = () => useContext(globalContext);

const AppContext = ({ children }) => {
  const [displaySearch, setSearch] = useState(isMobile);

  return (
    <globalContext.Provider value={{ displaySearch, setSearch }}>
      {children}
    </globalContext.Provider>
  );
};

export default AppContext;
