"use client";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useMusic } from "@/hook";
import { useEffect, useRef } from "react";
import { usePlayer } from "@/context/playerContext";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { TbMoodEmpty, TbPlayerPause, TbPlayerStop } from "react-icons/tb";
import { useRouter } from "next/navigation";

const YourMusicList = () => {
  const { getMusic, music } = useMusic();
  const { setCurrentMusic, currentMusic, setPlaylist } = usePlayer();
  const router = useRouter();
  const playing = currentMusic.music_url;

  useEffect(() => {
    setPlaylist(music);
    getMusic();
  }, []);

  const handleMusicId = (id: string) => {
    return router.push(`/dashBoard/${id}`);
  };

  return (
    <ul className="flex flex-col  w-full gap-2 p-2 ">
      {music && music.length > 0 ? (
        <>
          {music.map((music) => (
            <li key={music.id} className="w-full flex items-center ">
              <div className="w-full flex justify-between items-center   text-xl gap-4">
                <div
                  onClick={() => handleMusicId(music.id)}
                  className="flex items-center cursor-pointer gap-2"
                >
                  <div className="w-[80px] h-[80px] bg-contain">
                    <img
                      className="w-full h-full rounded-md "
                      src={music.cover_image}
                      alt=""
                    />
                  </div>
                  <div>
                    <p>{music.name}</p>
                    <p>{music.artist}</p>
                  </div>
                </div>

                <div className="flex justify-end w-[20%] h-[20%]">
                  {playing === music.music_url ? (
                    <button className="flex border items-center justify-center rounded-full w-10 h-10">
                      <TbPlayerPause className="text-3xl" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentMusic(music, true)}
                      className="flex border items-center justify-center rounded-full w-10 h-10"
                    >
                      <AiOutlinePlayCircle className="text-3xl" />
                    </button>
                  )}
                </div>
              </div>
            </li>
          ))}
        </>
      ) : (
        <>
          <div className="h-[350px] flex items-center justify-center flex-col gap-4">
            <h2 className="text-5xl ">Sem músicas aqui...</h2>
            <TbMoodEmpty className="text-9xl" />
            <p className="text-4xl">Adicione novas musicas</p>
          </div>
        </>
      )}
    </ul>
  );
};

export default YourMusicList;
