"use client";
import { musicData } from "@/schemas/music.schema";
import api from "@/services/api";
import Toast from "@/app/components/Toast";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface musicProviderProp {
  children: React.ReactNode;
}

export interface HistoricData {
  id: string;
  music_name: string;
  artist: string;
  cover_image: string;
  music_url: string;
  isPlaying?: boolean | false;
}

interface musicValues {
  getMusic: (genre?: string) => void;
  getOneMusic: (id: string) => void;
  getUserHistoric: () => void;
  deleteHistoric: (id: string) => void;
  createMusic: () => Promise<void>;
  music: musicData[];
  setMusic: Dispatch<SetStateAction<musicData[]>>;
  historic: HistoricData[];
  setHistoric: Dispatch<SetStateAction<HistoricData[]>>;
  musicInfo: {
    name: string;
    artist: string;
    album: string;
    genre: string;
    year: string;
  };

  setMusicInfo: Dispatch<
    SetStateAction<{
      name: string;
      artist: string;
      album: string;
      genre: string;
      year: string;
    }>
  >;

  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  newMusic: File | null;
  setNewMusic: Dispatch<SetStateAction<File | null>>;
  coverImage: File | null;
  setCoverImage: Dispatch<SetStateAction<File | null>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  oneMusic: musicData | undefined;
  createHistoric: (data: HistoricData) => Promise<void>;
  deleteMusic: (id: string) => void;
}

export const MusicContext = createContext<musicValues>({} as musicValues);

export const MusicProvider = ({ children }: musicProviderProp) => {
  const [music, setMusic] = useState<musicData[]>([]);
  const [historic, setHistoric] = useState<HistoricData[]>([]);
  const [oneMusic, setOneMusic] = useState<musicData | undefined>();
  const [newMusic, setNewMusic] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [page, setPage] = useState(0);
  const [musicInfo, setMusicInfo] = useState({
    name: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
  });
  const [mode, setMode] = useState("");

  const cookies = parseCookies();

  if (cookies["user.Token"]) {
    api.defaults.headers.common.authorization = `Bearer ${cookies["user.Token"]}`;
  }

  const getMusic = async (genre?: string) => {
    try {
      let url = "music";
      if (genre) {
        url += `?genre=${genre}`;
      }

      const response = await api.get(url);
      setMusic(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getOneMusic = async (id: string) => {
    try {
      const response = await api.get(`music/${id}`);
      setOneMusic(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFiles = async (
    musicId: string,
    music: File,
    coverImage: File
  ) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const fd = new FormData();
      if (music.name.includes("mp3") && coverImage?.name.includes("jpg")) {
        fd.append("music", music);
        fd.append("cover_image", coverImage);
        const res = await api.patch(`music/upload/${musicId}`, fd, config);
        return res.status;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createMusic = async () => {
    try {
      const response = await api.post<musicData>("music", musicInfo);
      await uploadFiles(response.data.id, newMusic!, coverImage!);

      Toast({
        message: "Musica adicionada com sucesso",
        isSucess: true,
      });

      getMusic();
    } catch (error) {
      Toast({
        message: "Algum erro ocorreu tente novamente",
        isSucess: false,
      });
      console.log(error);
    }
  };

  const deleteMusic = async (id: string) => {
    try {
      const response = await api.delete(`music/${id}`);
      Toast({
        message: "Deletado com sucesso!",
        isSucess: true,
      });
      getMusic();
    } catch (error) {
      Toast({
        message: "Algo deu errado ao tentar deletar sua musica!",
        isSucess: false,
      });
    }
  };

  const getUserHistoric = async () => {
    try {
      const decodedToken = jwt.decode(cookies["user.Token"]);

      const id = decodedToken ? decodedToken.sub : null;

      const response = await api.get(`historic/${id}`);
      setHistoric(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHistoric = async (id: string) => {
    try {
      const response = await api.delete(`historic/${id}`);
      getUserHistoric();
    } catch (error) {
      console.log(error);
    }
  };

  const createHistoric = async (data: HistoricData) => {
    try {
      const response = await api.post(`historic`, data);
      getUserHistoric();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        getMusic,
        music,
        setMusic,
        musicInfo,
        setMusicInfo,
        page,
        setPage,
        newMusic,
        setNewMusic,
        coverImage,
        setCoverImage,
        mode,
        setMode,
        createMusic,
        oneMusic,
        getOneMusic,
        deleteMusic,
        createHistoric,
        historic,
        setHistoric,
        getUserHistoric,
        deleteHistoric,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
