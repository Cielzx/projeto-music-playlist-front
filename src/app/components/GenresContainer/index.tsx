import { useMusic } from "@/hook";
import { useEffect } from "react";

interface genreProp {
  genre: string;
}

const GenresContainer = ({ genre }: genreProp) => {
  const { music, getMusic } = useMusic();

  useEffect(() => {
    console.log(music);
    getMusic(genre);
  }, []);
  return (
    <section className="flex flex-col gap-5">
      <div className="w-full">
        <img src="" alt="" />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex gap-6">
          <p>Titulo</p>
          <p>Artista</p>
          <p>Album</p>
        </div>

        <ul className="">
          <li>
            <div className="w-full rounded-md">
              <img src="" alt="" className="w-[80px] h-[80px]" />
            </div>

            <p>teste</p>

            <p>teste</p>

            <p>teste</p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default GenresContainer;
