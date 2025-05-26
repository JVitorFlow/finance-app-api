import { z } from "zod";

export const createUserSchema = z.object({
  first_name: z
    .string({ required_error: "First name is required." })
    .trim()
    .min(1, "First name is required."),

  last_name: z
    .string({ required_error: "Last name is required." })
    .trim()
    .min(1, "Last name is required."),

  email: z
    .string({ required_error: "E-mail is required." })
    .trim()
    .min(1, "E-mail is required.")
    .email("Please provide a valid e-mail."),

  password: z
    .string({ required_error: "Password is required." })
    .trim()
    .min(6, "Password must have at least 6 characters."),
});
