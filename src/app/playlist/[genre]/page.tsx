"use client";
import Container from "@/app/components/Container/container";
import { musicData } from "@/schemas/music.schema";
import PlaylistCard from "../components/playlistCard";
import { useMusic } from "@/hook";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/app/components/Loading";

const playlistPage = ({ params }: { params: { genre: string } }) => {
  const { music, getMusic } = useMusic();
  const [currentMusic, setCurrentMusic] = useState<musicData>();
  const pathname = usePathname();
  const selectRandomMusic = () => {
    const randomIndex = Math.floor(Math.random() * music.length);
    if (music.length > 0) {
    }
  };

  useEffect(() => {
    getMusic(params.genre);

    music.map((item) => setCurrentMusic(item));
  }, [music]);

  if (!currentMusic) {
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
          <div
            className="flex flex-col justify-end gap-4 h-[50%] p-2 rounded-md bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: `url(${currentMusic.cover_image})`,
            }}
          >
            <h2 className="text-5xl">{currentMusic.genre}</h2>

            <span className="text-3xl">Os melhores você encontra aqui</span>
          </div>

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
              <PlaylistCard genre={params.genre} />
            </ul>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default playlistPage;
