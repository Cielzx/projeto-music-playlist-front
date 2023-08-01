import { usePlayer } from "@/context/playerContext";
import { useMusic } from "@/hook";
import { musicData } from "@/schemas/music.schema";
import Image from "next/image";
import { useEffect } from "react";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { TbPlayerPause, TbPlayerStop } from "react-icons/tb";

interface IMusicContainerProps {
  id: string;
}

const MusicContainer = ({ id }: IMusicContainerProps) => {
  const { setCurrentMusic, currentMusic } = usePlayer();
  const { oneMusic, getOneMusic } = useMusic();

  useEffect(() => {
    getOneMusic(id);
  }, []);

  if (!oneMusic) {
    return <>Carregando</>;
  }

  const isPlaying = currentMusic.music_url === oneMusic.music_url;
  return (
    <div className="w-4/5 h-3/4 min-w-[1502px] min-h-[850px] bg-[#120a8f] bg-opacity-25 border-2 border-blue-500 rounded-lg flex flex-row pb-8 pt-20">
      <div className="flex flex-col justify-center w-2/4 pl-32">
        <p className="text-5xl text-gray-100 pb-6 ml-12">{oneMusic.name}</p>
        <div className=" w-[30rem] h-[33rem] ml-12">
          <Image
            className="h-[426px]"
            width={485}
            height={482}
            src={oneMusic.cover_image}
            alt="Nome da Música"
          />
          <div className="w-[30rem] bg-gray-100 flex justify-center rounded-b-lg">
            <button
              onClick={() => {
                setCurrentMusic(oneMusic, true);
              }}
            >
              {isPlaying ? (
                <TbPlayerPause className="fill-pink-500 w-10 h-10 m-1" />
              ) : (
                <BsFillPlayCircleFill className="fill-pink-500 w-10 h-10 m-1" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12 w-2/4 justify-center ">
        <p className="text-5xl my-2 text-gray-100">
          {" "}
          <strong>Artista:</strong> {oneMusic.artist}
        </p>
        <p className="text-5xl my-2 text-gray-100">
          {" "}
          <strong>Álbum:</strong> {oneMusic.album}
        </p>
        <p className="text-5xl my-2 text-gray-100">
          {" "}
          <strong>Gênero:</strong> {oneMusic.genre}
        </p>
        <p className="text-5xl my-2 text-gray-100">
          {" "}
          <strong>Ano: </strong> {oneMusic.year}
        </p>
      </div>
    </div>
  );
};

export default MusicContainer;
