"use client";
import Container from "@/app/components/Container/container";
import { CombinedData, musicData } from "@/schemas/music.schema";
import PlaylistCard from "../components/playlistCard";
import { useMusic, useUser } from "@/hook";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/app/components/Loading";
import YourPlaylist from "../components/YourPlaylist";
import { HistoricData } from "@/context/musicContext";
import { string } from "zod";

const playlistPage = ({ params }: { params: { genre: string } }) => {
  const { music, getMusic } = useMusic();

  const [currentPlaylistMusic, setCurrentPlaylitMusic] = useState<CombinedData>(
    {
      id: "123",
      name: "Example",
      album: "Sample Album",
      artist: "Sample Artist",
      genre: "Rock",
      year: "2022",
      cover_image: "image_url",
      music_url: "music_url",
    }
  );

  const [background, setBackground] = useState<string>();
  const { user, getUser } = useUser();
  const pathname = usePathname();

  // const selectRandomMusic = () => {
  //   const randomIndex = Math.floor(Math.random() * music.length);
  //   if (music.length > 0) {
  //   }
  // };

  useEffect(() => {
    getMusic(params.genre);
    getUser();
    music.map((item) => setCurrentPlaylitMusic(item));

    if (
      pathname === "/playlist/Historic" ||
      pathname === "/playlist/YourPlaylist"
    ) {
      setBackground(user && user.profile_image);
    } else {
      setBackground(currentPlaylistMusic.cover_image);
    }
  }, [music]);

  if (!currentPlaylistMusic) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <main className="flex flex-col min-h-screen backgroundDash p-2 text-white">
      <Container>
        <section className="w-full h-screen flex flex-col  p-2">
          {pathname === "/playlist/YourPlaylist" ? (
            <>
              <div
                className="flex flex-col justify-end gap-4 h-[50%] p-2 rounded-md bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url(${background})`,
                }}
              >
                <div className="w-full bg-black opacity-50 rounded-md p-2">
                  <h2 className="text-5xl">Suas Músicas</h2>
                  <span className="text-3xl">Musicas adicionadas por você</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="flex flex-col justify-end gap-4 h-[50%]  p-2 rounded-md bg-no-repeat bg-center bg-cover"
                style={{
                  backgroundImage: `url(${background})`,
                }}
              >
                {pathname === "/playlist/Historic" ? (
                  <div className="w-full bg-black opacity-50 rounded-md p-2">
                    <h2 className="text-5xl">Histórico</h2>
                    <span className="text-3xl">
                      Aqui estão suas musicas já escutadas
                    </span>
                  </div>
                ) : (
                  <div className="w-full bg-black opacity-50 rounded-md p-2">
                    {"genre" in currentPlaylistMusic ? (
                      <>
                        <h2 className="text-5xl">
                          {currentPlaylistMusic.genre}
                        </h2>
                      </>
                    ) : (
                      <></>
                    )}

                    <span className="text-3xl">
                      Os melhores você encontra aqui
                    </span>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="flex flex-col w-full gap-2 p-2">
            <div className="flex justify-between p-1 border-b-[1px] border-blue-400">
              <div className="w-[9%] flex justify-start">
                <p>Titulo</p>
              </div>

              <div className="w-[9%] flex justify-start">
                <p>Artista</p>
              </div>

              <div className="w-[9%] flex justify-start">
                <p>Álbum</p>
              </div>
            </div>
            <ul className="flex flex-col w-full gap-2 p-2">
              <>
                {pathname === "/playlist/YourPlaylist" ? (
                  <>
                    <YourPlaylist />
                  </>
                ) : (
                  <></>
                )}
                <PlaylistCard setCurrent={setCurrentPlaylitMusic} />
              </>
            </ul>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default playlistPage;
