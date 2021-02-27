import React, { useState, useContext, createContext } from "react";
import { yahooLogoAsBase64, googleLogoAsBase64 } from "./assets";

const DEFAULT_API_RESPONSE = [
  {
    title: "Google.com",
    label: "The world's best search engine",
    link: "https://google.com",
    image: googleLogoAsBase64,
    bounds: {
      top: 1,
      left: 2,
      right: 6,
      bottom: 5,
    },
  },
  {
    title: "Yahoo.com",
    label: "Not the world's best search engine",
    link: "https://yahoo.com",
    image: yahooLogoAsBase64,
    bounds: {
      top: 6,
      left: 7,
      right: 12,
      bottom: 12,
    },
  },
];

const ApiContext = createContext({
  data: [],
  setData: () => {},
});

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState(DEFAULT_API_RESPONSE);

  const handleAddCell = (newCellData) => {
    setData((existingCellData) => {
      return [...existingCellData, newCellData];
    });
  };

  return (
    <ApiContext.Provider value={{ data, setData, handleAddCell }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const { data, setData, handleAddCell } = useContext(ApiContext);

  return { data, setData, handleAddCell };
};
