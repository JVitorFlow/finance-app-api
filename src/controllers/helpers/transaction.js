import validator from "validator";
import { badRequest, notFound } from "./index.js";

export const checkIfAmountIsValid = (amount) => {
  return validator.isCurrency(amount.toFixed(2), {
    digits_after_decimal: [2],
    allow_negatives: false,
    decimal_separator: ".",
  });
};

export const checkIfTypeIsValid = (type) => {
  const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"];
  return typeIsValid.includes(type);
};

export const invalidAmountResponse = () =>
  badRequest({ message: "The amount must be a valid currency." });

export const invalidTypeResponse = () =>
  badRequest({
    message: "The type must be EARNING, EXPENSE or INVESTMENT.",
  });

export const transactionNotFoundResponse = () =>
  notFound({ message: "Transaction not found" });
