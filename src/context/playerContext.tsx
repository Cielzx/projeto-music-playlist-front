"use client";
import Player from "@/app/components/Player";
import {
  CurrentHistoricType,
  CurrentMusicType,
  musicData,
} from "@/schemas/music.schema";

import { ReactNode, createContext, useContext, useState } from "react";
import { HistoricData } from "./musicContext";
import { DndContext } from "@dnd-kit/core";

interface Props {
  children: ReactNode;
}

interface PlayerProviderData {
  currentMusic: CurrentMusicType;
  setCurrentMusic: (cm: Partial<CurrentMusicType>, replace?: boolean) => void;
  playList: musicData[] | HistoricData[];
  setPlaylist: (data: musicData[] | HistoricData[]) => void;
}

const defaultMusic: CurrentMusicType = {
  id: "kenzie",
  cover_image: "",
  name: "",
  artist: "",
  album: "",
  genre: "",
  music_url: "",
  year: "",
  isPlaying: false,
};

const defaultHistoricMusic: CurrentHistoricType = {
  id: "Historic",
  cover_image: "",
  music_name: "",
  artist: "",
  music_url: "",
  isPlaying: false,
};

const PlayerContext = createContext<PlayerProviderData>(
  {} as PlayerProviderData
);

export const PlayerProvider = ({ children }: Props) => {
  const [musics, setMusics] = useState<musicData[] | HistoricData[]>([]);
  const [current, setCurrent] = useState<CurrentMusicType>(defaultMusic);

  const setCurrentMusic = (
    music: Partial<CurrentMusicType>,
    replace = false
  ) => {
    if (replace && music.music_url !== current.music_url) {
      setCurrent(music as CurrentMusicType);
    } else {
      setCurrent((prev) => ({ ...prev, ...music }));
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentMusic: current,
        setCurrentMusic,
        playList: musics,
        setPlaylist: setMusics,
      }}
    >
      {children}
      {current.music_url && <Player />}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
