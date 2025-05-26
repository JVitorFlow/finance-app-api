import validator from "validator";
import { z } from "zod";

export const createTransactionShema = z.object({
  user_id: z.string().uuid({
    message: "User ID must be a valid UUID.",
    required_error: "User ID is required.",
  }),
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(1, "Name is required."),

  date: z
    .string({
      required_error: "Date is required.",
      invalid_type_error: "Date must be a string in ISO 8601 format.",
    })
    .datetime({
      message: "Date must follow ISO 8601 format (e.g., 2023-05-26T20:00:00Z).",
    }),
  type: z.enum(["EXPENSE", "EARNING", "INVESTMENT"], {
    errorMap: () => ({
      message:
        "Type must be one of the following: EXPENSE, EARNING, INVESTMENT.",
    }),
  }),
  amount: z
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a number.",
    })
    .min(0.01, "Amount must be greater than 0.")
    .refine((value) =>
      validator.isCurrency(value.toFixed(2), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: ".",
      }),
    ),
});
