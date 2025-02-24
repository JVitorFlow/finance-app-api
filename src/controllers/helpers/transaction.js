import validator from "validator";
import { badRequest } from "./index.js";

export const checkIfAmountIsValid = (amount) => {
  return validator.isCurrency(amount.toString(), {
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
