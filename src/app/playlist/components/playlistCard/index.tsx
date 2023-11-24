"use client";
import { usePlayer } from "@/context/playerContext";
import { useMusic, useUser } from "@/hook";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Tooltip } from "@chakra-ui/react";

interface cardProp {
  genre: string;
}

const PlaylistCard = ({ genre }: cardProp) => {
  const { getMusic, music, getUserHistoric, historic, deleteHistoric } =
    useMusic();
  const { user } = useUser();
  const { setCurrentMusic, currentMusic, setPlaylist, playList } = usePlayer();
  const playing = currentMusic.music_url;

  const audioRef = useRef<HTMLAudioElement>();

  const pathname = usePathname();
  useEffect(() => {
    getMusic(genre);
    getUserHistoric();

    if (pathname === "/playslit/Historico") {
      setPlaylist(historic);
    }

    // setPlaylist(music);

    // console.log(playList);bv
  }, [pathname]);

  return (
    <>
      {pathname === "/playlist/Historico" ? (
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
