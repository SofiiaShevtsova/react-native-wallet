import { Languages } from "../constants/constants";

const localeMap: Record<Languages, string> = {
  uk: "uk-UA",
  en: "en-US",
  pl: "pl-PL",
};

export const formatAmount = (
  amount: number,
  language: Languages,
  currency: string,
  style: "currency" | "decimal" = "currency",
) => {
  return new Intl.NumberFormat(localeMap[language], {
    style,
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
