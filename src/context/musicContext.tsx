"use client";
import { musicData } from "@/schemas/music.schema";
import api from "@/services/api";
import { parseCookies } from "nookies";
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

interface musicValues {
  getMusic: () => void;
  getOneMusic: (id: string) => void;
  createMusic: () => Promise<void>;
  music: musicData[];
  setMusic: Dispatch<SetStateAction<musicData[]>>;
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
}

export const MusicContext = createContext<musicValues>({} as musicValues);

export const MusicProvider = ({ children }: musicProviderProp) => {
  const [music, setMusic] = useState<musicData[]>([]);
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

  const getMusic = async () => {
    try {
      const response = await api.get("music");
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
      getMusic();
      console.log(response.data);
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
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};
