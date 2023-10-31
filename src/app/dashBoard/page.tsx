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
import { useMusic, useUser } from "@/hook";
import { useDisclosure } from "@chakra-ui/react";
import UploadMusicModal from "./components/UploadModal/MusicModal";
import UploadImageModal from "./components/UploadModal/ImageModal";
import { useRouter } from "next/navigation";
import Container from "../components/Container/container";
import Historic from "./components/Historic";
import Loading from "../components/Loading";

const DashBoard = () => {
  const { setMode, page, music, getMusic, mode } = useMusic();
  const { user, getUser } = useUser();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const router = useRouter();

  const handleGenre = (genre?: string) => {
    if (genre) {
      getMusic(genre);
    }

    getMusic();
  };

  if (!music) {
    return console.log("Sem musica");
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <main className="flex flex-col  items-center backgroundDash p-2">
      <Container>
        <section className="w-[90%] h-[40%] flex gap-12 max-[920px]:flex-col">
          <div className="w-[120px] flex flex-col items-center gap-10 text-white text-5xl max-[920px]:flex-row max-[920px]:mt-4 max-[920px]:w-full max-[920px]:justify-around max-[920px]:gap-4 hidden">
            <button>
              <GoHome
                onClick={() => setMode("")}
                className="text-white fill-white max-[920px]:w-[36px]"
              />
            </button>

            <button>
              <SlPlaylist className="text-white fill-white max-[920px]:w-[36px]" />
            </button>

            <button>
              <AiOutlineFire className="text-white fill-white max-[920px]:w-[36px]" />
            </button>

            <button>
              <MdOutlineWatchLater
                onClick={() => setMode("historic")}
                className="text-white fill-white max-[920px]:w-[36px]"
              />
            </button>

            <button onClick={() => router.push("/profile")}>
              <RxGear className="text-white fill-white max-[920px]:w-[36px]" />
            </button>
          </div>

          <div className="w-full ">
            {mode === "historic" ? (
              <>
                <Historic />
              </>
            ) : (
              <>
                <GenreStaticList />
              </>
            )}
          </div>
        </section>

        <section className="w-[90%]   text-white">
          <div className=" flex h-[40%] gap-6 p-2 max-[920px]:flex-col">
            <div className="w-[30%] flex flex-col h-full gap-8 p-2 max-[920px]:hidden">
              <h2 className="text-2xl">Generos</h2>
              <div className="flex flex-wrap gap-2 w-[100%]">
                {generosMusicais.map((genres) => (
                  <button
                    key={genres.nome}
                    onClick={() => handleGenre(genres.nome)}
                    className="btn-primary w-[30%] text-base h-16 max-lg:text-sm truncate"
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

            <div className="w-[45%] max-[920px]:w-full">
              <div className="h-[590px] flex flex-col border rounded-lg  border-[#03327D] p-2">
                <div className="w-full flex justify-between">
                  {mode === "yourMusic" ? (
                    <>
                      <h2 className="text-2xl">Escute as suas músicas</h2>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl">Musicas disponiveis</h2>
                    </>
                  )}
                </div>

                <div className="w-full h-[82%]">
                  {mode === "yourMusic" ? (
                    <>
                      <div className="flex flex-row justify-center mb-6">
                        <div className=" bg-blue-400 w-5 h-5 m-1 rounded-full"></div>
                        <div
                          onClick={() => setMode("")}
                          className=" bg-gray-400 w-5 h-5 m-1 rounded-full cursor-pointer"
                        ></div>
                      </div>
                      <YourMusicList music={user.music} />
                    </>
                  ) : (
                    <>
                      <div className="flex flex-row justify-center mb-6">
                        <div
                          onClick={() => setMode("yourMusic")}
                          className=" bg-gray-400 w-5 h-5 m-1 rounded-full cursor-pointer"
                        ></div>
                        <div className=" bg-blue-400 w-5 h-5 m-1 rounded-full"></div>
                      </div>
                      <YourMusicList music={music} />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="w-[30%] max-[920px]:w-[80%]">
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
      </Container>
    </main>
  );
};

export async function getServerSideProps() {
  const res = await api.get<musicData[]>("music");
  console.log(res);
  return { props: { musics: res.data } };
}

export default DashBoard;
