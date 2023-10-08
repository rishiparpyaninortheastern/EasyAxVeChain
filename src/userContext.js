import { createContext, useState } from "react";
import { contract as initialContract } from "./constants/dummynode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [contract, setContract] = useState(initialContract); // Add state for contract

  return (
    <UserContext.Provider value={{ userId, setUserId, contract, setContract }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
