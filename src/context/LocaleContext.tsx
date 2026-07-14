import React, { createContext, useContext } from "react";

import { LocaleContextType } from "../types";
import { Languages } from "../constants/constants";

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLng = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error(
      "useLng повинен бути використаний всередині LocaleProvider",
    );
  }
  return context;
};

export const LocaleProvider: React.FC<{
  children: React.ReactNode;
  lng: Languages;
  currency: string;
}> = ({ children, lng, currency }) => {
  const contextValue: LocaleContextType = {
    lng,
    currency,
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
};
