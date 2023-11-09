"use client";
import { usePlayer } from "@/context/playerContext";
import { useMusic } from "@/hook";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { TbPlayerPause } from "react-icons/tb";

interface cardProp {
  genre: string;
}

const PlaylistCard = ({ genre }: cardProp) => {
  const { getMusic, music, getUserHistoric, historic } = useMusic();
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

    // console.log(playList);
  }, [pathname]);

  return (
    <>
      {pathname === "/playlist/Historico" ? (
        <>
          {historic &&
            historic.map((item) => (
              <li key={item.id} className="flex justify-between">
                <div className="w-[30%] flex gap-2">
                  <div className="w-[60px] h-[60px]">
                    <img
                      src={item.cover_image}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <p>{item.music_name}</p>
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
      ) : (
        <>
          {music &&
            music.map((item) => (
              <li key={item.id} className="flex justify-between">
                <div
                  className="w-[30%] flex gap-2 cursor-pointer"
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

                  <div className="flex flex-col gap-2">
                    <p>{item.name}</p>
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
