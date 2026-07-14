import { Languages } from "../constants/constants";

export const getLocale = (lng: Languages) => {
  switch (lng) {
    case "uk":
      return "uk-UA";
    case "pl":
      return "pl-PL";
    default:
      return "en-US";
  }
};
