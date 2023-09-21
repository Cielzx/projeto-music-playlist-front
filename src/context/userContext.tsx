"use client";
import { musicData } from "@/schemas/music.schema";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import jwt from "jsonwebtoken";
import { parseCookies } from "nookies";
import api from "@/services/api";
import Toast from "@/app/components/Toast";
import { useAuth } from "@/hook";
import { usePathname } from "next/navigation";

interface userProviderProp {
  children: React.ReactNode;
}

export interface userDescription {
  description: string;
}

interface userData {
  id: string;
  name: string;
  email: string;
  profile_image: string;
  description: string;
  music: musicData[];
}

interface userValues {
  user: userData | undefined;
  setUser: Dispatch<SetStateAction<userData | undefined>>;
  getUser: () => void;
  uploadPhoto: (
    userId: string,
    profileImage: File
  ) => Promise<number | undefined>;
  setProfileImage: Dispatch<SetStateAction<File | null>>;
  profileImage: File | null;
  mode: string;
  description: string;
  updateDescription: (data: userDescription) => Promise<void>;
  setMode: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<userValues>({} as userValues);

export const UserProvider = ({ children }: userProviderProp) => {
  const [user, setUser] = useState<userData>();
  let [userId, setUserId] = useState("");
  const [mode, setMode] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  let cookies = parseCookies();

  let pathname = usePathname();

  if (cookies["user.Token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["user.Token"]}`;
  }

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

  useEffect(() => {
    let decodedToken = jwt.decode(cookies["user.Token"]);
    let id = decodedToken ? decodedToken.sub : null;
    setUserId(id!);
  }, [cookies["user.Token"]]);

  const updateDescription = async (data: userDescription) => {
    try {
      const decodedToken = jwt.decode(cookies["user.Token"]);

      const id = decodedToken ? decodedToken.sub : null;
      const response = await api.patch(`users/${id}`, data);
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhoto = async (userId: string, profileImage: File) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const fd = new FormData();
      if (profileImage.name.includes("jpg")) {
        fd.append("profile_image", profileImage);
        const res = await api.patch(
          `users/upload/profile/${userId}`,
          fd,
          config
        );
        Toast({
          message: "Foto atualizada",
          isSucess: true,
        });
        getUser();
        return res.status;
      }
    } catch (error) {
      Toast({
        message: "Erro tente novamente",
        isSucess: false,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [pathname]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        getUser,
        uploadPhoto,
        profileImage,
        setProfileImage,
        mode,
        setMode,
        description,
        updateDescription,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
