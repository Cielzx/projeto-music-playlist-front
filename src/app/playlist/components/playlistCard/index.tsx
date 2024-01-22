"use client";
import { usePlayer } from "@/context/playerContext";
import { useMusic, useUser } from "@/hook";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Tooltip } from "@chakra-ui/react";
import Loading from "@/app/components/Loading";
import { CombinedData, musicData } from "@/schemas/music.schema";
import { HistoricData } from "@/context/musicContext";

interface cardProp {
  setCurrent: Dispatch<SetStateAction<CombinedData>>;
  userMusic?: [];
}

const PlaylistCard = ({ setCurrent }: cardProp) => {
  const { getMusic, music, getUserHistoric, historic, deleteHistoric } =
    useMusic();
  const { user, getUser } = useUser();
  const { setCurrentMusic, currentMusic, setPlaylist, playList } = usePlayer();
  const playing = currentMusic.music_url;

  const pathname = usePathname();
  useEffect(() => {
    getUser();
    getUserHistoric();
    historic.map((item) => setCurrent(item));
  }, [pathname]);

  return (
    <>
      {pathname === "/playlist/Historic" ? (
        <>
          {historic.length === 0 ? (
            <>
              <div className="w-full h-[300px] flex justify-center items-center">
                <h3 className="text-white text-4xl">Sem historico...</h3>
              </div>
            </>
          ) : (
            <>
              {historic &&
                historic.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <div className="w-[30%] max-[920px]:w-[40%] flex gap-2">
                      <div className="w-[60px] h-[60px]">
                        <img
                          src={item.cover_image}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="">{item.music_name}</p>

                        <button
                          onClick={() => {
                            deleteHistoric(item.id);
                          }}
                          className="w-[50%] text-white font-semibold"
                        >
                          Remover
                        </button>
                      </div>
                    </div>

                    <div className="w-[30%]">
                      <p>{item.artist}</p>
                    </div>

                    <div className="w-[9%]">
                      <p>{item.artist}</p>
                    </div>
                  </li>
                ))}
            </>
          )}
        </>
      ) : (
        <>
          {music &&
            music.map((item) => (
              <li key={item.id} className="flex justify-between">
                <div
                  className="w-[30%] max-[920px]:w-[40%] max-[920px]:text-xs flex gap-2 cursor-pointer"
                  onClick={() => {
                    setCurrentMusic(item, true);
                  }}
                >
                  <div className="w-[60px] h-[60px]">
                    <img
                      src={item.cover_image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col gap-2 max-[920px]:w-[40%] truncate">
                    <Tooltip
                      label={item.name}
                      aria-label="A tooltip"
                      placement="right"
                      bg="black"
                      color="white"
                    >
                      <p>{item.name}</p>
                    </Tooltip>
                  </div>
                </div>

                <div className="w-[30%]">
                  <p>{item.artist}</p>
                </div>

                <div className="w-[9%]">
                  <p>{item.album}</p>
                </div>
              </li>
            ))}
        </>
      )}
    </>
  );
};

export default PlaylistCard;
