import { z } from "zod";

export const loginData = z.object({
  email: z.string().email().nonempty("Email obrigatorio!"),
  password: z.string().nonempty("Senha obrigatoria!"),
});

export const registerData = z.object({
  name: z.string().nonempty("Nome obrigatorio!"),
  email: z.string().email().nonempty("Email obrigatorio"),
  password: z.string().nonempty("Senha obrigatoria!"),
});

export type LoginData = z.infer<typeof loginData>;
export type RegisterData = z.infer<typeof registerData>;
