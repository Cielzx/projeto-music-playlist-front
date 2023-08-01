"use client";
import { LoginData, RegisterData } from "@/app/login/components/validator";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { createContext } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthValue {
  loginFunction: (data: LoginData) => void;
  registerFunction: (data: RegisterData) => void;
}

export const AuthContext = createContext<AuthValue>({} as AuthValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const loginFunction = async (data: LoginData) => {
    try {
      const response = await api.post("login", data);
      const { token } = response.data;
      setCookie(null, "user.Token", token, {
        maxAge: 60 * 1500,
        path: "/",
      });
      router.push("/dashBoard");
    } catch (error) {
      console.log(error);
    }
  };

  const registerFunction = async (data: RegisterData) => {
    try {
      const response = await api.post("users", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ loginFunction, registerFunction }}>
      {children}
    </AuthContext.Provider>
  );
};
