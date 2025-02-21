import validator from "validator";
import { badRequest } from "./http.js";

export const checkIfIdIsValid = (id) => validator.isUUID(id);
export const invalidIdResponse = () =>
  badRequest({ message: "The provide id is not valid" });

export const checkIfIsString = (value) => typeof value === "string";

export const validateRequiredFields = (params, requiredFields) => {
  for (const field of requiredFields) {
    const fieldIsUndefined = params[field] === undefined;
    const fieldIsEmpty =
      checkIfIsString(params[field]) &&
      validator.isEmpty(params[field], { ignore_whitespace: false });
    if (fieldIsUndefined || fieldIsEmpty) {
      return {
        missingField: field,
        ok: false,
      };
    }
  }

  return {
    ok: true,
    missingField: undefined,
  };
};
