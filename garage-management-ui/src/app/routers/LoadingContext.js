import React, { createContext, useContext, useState } from "react";
import LoadingOverlay from "../layouts/LoadingPage/LoadingOverlay";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <LoadingOverlay />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
