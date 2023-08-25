"use client";
import { GoHome } from "react-icons/go";
import { AiOutlineFire } from "react-icons/ai";
import { MdOutlineWatchLater } from "react-icons/md";
import { SlPlaylist } from "react-icons/sl";
import { RxGear } from "react-icons/rx";
import GenreStaticList from "./components/StaticGenreList";
import YourMusicList from "./components/YourMusicList";
import { generosMusicais } from "./components/StaticGenreList/array";
import ArtistList from "./components/ArtistsList";
import api from "@/services/api";
import { musicData } from "@/schemas/music.schema";
import { useMusic } from "@/hook";
import { useDisclosure } from "@chakra-ui/react";
import UploadMusicModal from "./components/UploadModal/MusicModal";
import UploadImageModal from "./components/UploadModal/ImageModal";

const DashBoard = () => {
  const { setMode, page, music, getMusic } = useMusic();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleGenre = (genre?: string) => {
    if (genre) {
      getMusic(genre);
    }

    getMusic();
  };

  if (!music) {
    return console.log("Sem musica");
  }

  return (
    <main className="flex flex-col min-h-screen  items-center backgroundDash p-2">
      <section className="w-[90%] h-[40%] flex gap-12">
        <div className="w-[120px] flex flex-col items-center gap-10 text-white text-5xl">
          <button>
            <GoHome className="text-white fill-white" />
          </button>

          <button>
            <SlPlaylist />
          </button>

          <button>
            <AiOutlineFire />
          </button>

          <button>
            <MdOutlineWatchLater />
          </button>

          <button>
            <RxGear />
          </button>
        </div>

        <div className="w-full p-2">
          <GenreStaticList />
        </div>
      </section>

      <section className="w-[90%]   text-white">
        <div className=" flex h-[40%] gap-6 p-2">
          <div className="w-[30%] flex flex-col h-full gap-8 p-2">
            <h2 className="text-2xl">Generos</h2>
            <div className="flex flex-wrap gap-2 w-[100%]">
              {generosMusicais.map((genres) => (
                <button
                  key={genres.nome}
                  onClick={() => handleGenre(genres.nome)}
                  className="btn-primary h-16"
                >
                  {genres.nome}
                </button>
              ))}
            </div>

            <div className="w-full">
              <button
                onClick={() => handleGenre()}
                className="w-full h-16 bg-[#1A3B6B] text-2xl rounded-lg"
              >
                Todos os gêneros
              </button>
            </div>
          </div>

          <div className="w-[45%] ">
            <div className="flex flex-col border rounded-lg  border-[#03327D] p-2">
              <div className="w-full flex justify-between">
                <h2 className="text-2xl">Escute as suas músicas</h2>
                <button
                  onClick={() => {
                    setMode("music");
                    onOpen();
                  }}
                  className="btn-primary w-40 h-10"
                >
                  Adicionar música
                </button>
              </div>

              <div className="w-full h-full ">
                <YourMusicList music={music} />
              </div>
            </div>
          </div>

          <div className="w-[20%]">
            <h2 className="text-2xl">Artistas</h2>
            <ArtistList />
          </div>
        </div>
      </section>
      <form>
        <UploadMusicModal isOpen={isOpen} onClose={onClose} />
        {page == 1 ? (
          <>
            <UploadImageModal isOpen={isOpen} onClose={onClose} />
          </>
        ) : (
          <></>
        )}
      </form>
    </main>
  );
};

export async function getServerSideProps() {
  const res = await api.get<musicData[]>("music");
  console.log(res);
  return { props: { musics: res.data } };
}

export default DashBoard;
