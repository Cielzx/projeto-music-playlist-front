"use client";
import { AiOutlineDelete, AiOutlinePlayCircle } from "react-icons/ai";
import { useMusic } from "@/hook";
import { useEffect, useRef } from "react";
import { usePlayer } from "@/context/playerContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { TbMoodEmpty, TbPlayerPause, TbPlayerStop } from "react-icons/tb";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { usePathname, useRouter } from "next/navigation";
import { musicData } from "@/schemas/music.schema";

interface MusicListProps {
  music: musicData[];
}

const YourMusicList = ({ music }: MusicListProps) => {
  const { getMusic, deleteMusic, createHistoric } = useMusic();
  const { setCurrentMusic, currentMusic, setPlaylist } = usePlayer();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setPlaylist(music);

    getMusic();
  }, [music]);

  const handleMusicId = (id: string) => {
    return router.push(`/dashBoard/${id}`);
  };

  return (
    <ul className="flex flex-col w-full h-full gap-2 p-2 overflow-auto">
      {music && music.length > 0 ? (
        <>
          {music.map((music) => (
            <li
              key={music.id}
              className="w-full flex items-center cursor-pointer"
              onClick={() => {
                setCurrentMusic(music, true),
                  createHistoric({
                    id: music.id,
                    music_name: music.name,
                    artist: music.artist,
                    cover_image: music.cover_image,
                    music_url: music.music_url,
                    isPlaying: false,
                  });
              }}
            >
              <div className="w-full flex justify-between items-center text-xl gap-4">
                <div className="flex items-center cursor-pointer gap-2 max-[920px]:w-[70%]">
                  <div className="w-[80px] h-[80px] bg-contain">
                    <img
                      className="w-full h-full rounded-md object-cover "
                      src={music.cover_image}
                      alt=""
                    />
                  </div>

                  {currentMusic.isPlaying &&
                  currentMusic.music_url === music.music_url ? (
                    <>
                      <div className="max-[920px]:truncate">
                        <p className="text-blue-600 font-semibold max-[920px]:text-xs">
                          {music.name}
                        </p>
                        <p>{music.artist}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="max-[920px]:truncate">
                        <p className="max-[920px]:text-xs">{music.name}</p>
                        <p className="max-[920px]:text-xs">{music.artist}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex gap-2 justify-end w-[20%] h-[20%]">
                  <button
                    onClick={() => handleMusicId(music.id)}
                    className="flex items-center justify-center rounded-full w-10 h-10"
                  >
                    <PiDotsThreeOutlineLight className="text-3xl" />
                  </button>
                  {/* {playing === music.music_url &&
                  currentMusic.isPlaying !== false ? (
                    <button
                      // onClick={() => setCurrentMusic({ isPlaying: false })}
                      className="flex border items-center justify-center rounded-full w-10 h-10"
                    >
                      <TbPlayerPause className="text-3xl" />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setCurrentMusic(music, true),
                          createHistoric({
                            id: music.id,
                            music_name: music.name,
                            artist: music.artist,
                            cover_image: music.cover_image,
                            music_url: music.music_url,
                            isPlaying: false,
                          });
                      }}
                      className="flex border items-center justify-center rounded-full w-10 h-10"
                    >
                      <AiOutlinePlayCircle className="text-3xl" />
                    </button>
                  )} */}

                  {pathname === "/profile" ? (
                    <>
                      <button
                        onClick={() => deleteMusic(music.id)}
                        className="flex border items-center justify-center rounded-full w-10 h-10"
                      >
                        <AiOutlineDelete className="text-3xl" />
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </li>
          ))}
        </>
      ) : (
        <>
          <div className="h-[350px] flex items-center justify-center flex-col gap-4 ">
            <h2 className="text-5xl max-[920px]:text-2xl ">
              Sem músicas aqui...
            </h2>
            <TbMoodEmpty className="text-9xl" />
            <p className="text-4xl max-[920px]:text-2xl">
              Adicione novas musicas
            </p>
          </div>
        </>
      )}
    </ul>
  );
};

export default YourMusicList;
