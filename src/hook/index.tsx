import { AuthContext } from "@/context/authContext";
import { MusicContext } from "@/context/musicContext";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export const useAuth = () => {
  const authcontext = useContext(AuthContext);
  return authcontext;
};

export const useMusic = () => {
  const musicContext = useContext(MusicContext);
  return musicContext;
};

export const useUser = () => {
  const userContext = useContext(UserContext);
  return userContext;
};
