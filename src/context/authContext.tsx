"use client";
import { LoginData, RegisterData } from "@/app/login/components/validator";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { parseCookies, setCookie } from "nookies";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import jwt from "jsonwebtoken";
import { musicData } from "@/schemas/music.schema";
import Toast from "@/app/components/Toast";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface userData {
  id: string;
  name: string;
  email: string;
  profile_image: string;
  music: musicData[];
}

interface AuthValue {
  loginFunction: (data: LoginData) => void;
  registerFunction: (data: RegisterData) => void;
  user: userData | undefined;
  setUser: Dispatch<SetStateAction<userData | undefined>>;
  getUser: () => void;
  userId: string;
}

export const AuthContext = createContext<AuthValue>({} as AuthValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState<userData>();
  const router = useRouter();
  const cookies = parseCookies();

  const loginFunction = async (data: LoginData) => {
    try {
      const response = await api.post("login", data);
      const { token } = response.data;

      setCookie(null, "user.Token", token, {
        maxAge: 60 * 1500,
        path: "/",
      });
      Toast({
        message: "Login realizado com sucesso!",
        isSucess: true,
      });
      setTimeout(() => {
        router.push("/dashBoard");
      }, 3000);
    } catch (error) {
      Toast({
        message: "Credenciais inválidas",
        isSucess: false,
      });
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const decodedToken = jwt.decode(cookies["user.Token"]);

      const id = decodedToken ? decodedToken.sub : null;
      const response = await api.get(`users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const registerFunction = async (data: RegisterData) => {
    try {
      const response = await api.post("users", data);
      getUser();
      Toast({
        message: "Usuario reagistrado com sucesso",
        isSucess: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginFunction,
        registerFunction,
        user,
        setUser,
        getUser,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
