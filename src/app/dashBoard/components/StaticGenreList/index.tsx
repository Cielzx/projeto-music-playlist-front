"use client";
import Loading from "@/app/components/Loading";
import { musicData } from "@/schemas/music.schema";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";

interface iGenre {
  genre: string;
  count: string;
}

const GenreStaticList = () => {
  const [music, setMusic] = useState<musicData[]>([]);
  const [genresCount, setGenresCount] = useState<iGenre[]>([]);

  const images = [
    {
      id: 1,
      image_url:
        "https://i.pinimg.com/564x/ba/37/1c/ba371c38022a638ddc7a19b34148dfe4.jpg",
      name: "Minhas Músicas",
    },
    {
      id: 2,
      image_url:
        "https://img.freepik.com/fotos-gratis/mulher-caucasiana-feliz-ouvindo-musica-com-fones-de-ouvido-se-divertindo-em-pe-no-fundo-rosa-morena-fechou-os-olhos-e-segurou-o-telefone-nas-maos_197531-30195.jpg?w=740&t=st=1689784336~exp=1689784936~hmac=3304e40df4b435a12622dc497edf3803edc7a9ae16bd5aa6627e08b12a14944d",
      name: "Historico",
    },
    {
      id: 3,
      image_url:
        "https://img.freepik.com/fotos-gratis/mulher-jovem-com-corte-de-cabelo-afro-com-fones-de-ouvido-amarelos_273609-23050.jpg?w=900&t=st=1689785041~exp=1689785641~hmac=1484e6459a7c96cefa122d2920954555e8027cf620d24fd2b5def3c464a87317",
      name: "Pop",
    },
    {
      id: 4,
      image_url:
        "https://img.freepik.com/fotos-gratis/homem-sorridente-de-tiro-medio-usando-fones-de-ouvido_23-2149480753.jpg?w=900&t=st=1689784870~exp=1689785470~hmac=dfa1116a5f646e6823b2b2623b52d688619544e12dcc53236889c566e318679a",
      name: "Rap",
    },
  ];

  const cookies = parseCookies();

  const handleMusicByGenre = (music: musicData[]) => {
    const count: Record<string, string> = {};

    music.forEach((item) => {
      const { genre } = item;
      if (genre in count) {
        count[genre] = (parseInt(count[genre]) + 1).toString();
      } else {
        count[genre] = "1";
      }
    });

    const genreArray = Object.keys(count).map((genre) => ({
      genre,
      count: count[genre],
    }));

    setGenresCount(genreArray);
    return genreArray;
  };

  const getMusicGenre = async () => {
    try {
      const response = await api.get(`music`, {
        headers: {
          Authorization: `Bearer ${cookies["user.Token"]}`,
        },
      });
      handleMusicByGenre(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();

  const handleMusicGenre = (genre: string) => {
    return router.push(`/playlist/${genre}`);
  };

  if (!genresCount) {
    return (
      <>
        <Loading />
      </>
    );
  }

  const teste = (item: string) => {
    const countTest = genresCount.find((genre) => {
      if (genre.genre === item) {
        return genre.genre;
      } else {
        return 0;
      }
    });

    return countTest?.count;
  };

  useEffect(() => {
    getMusicGenre();
  }, []);

  const teste2 = {
    name: "Pop",
  };

  return (
    <ul className="flex gap-8 max-[920px]:flex-wrap max-[920px]:gap-4">
      {images.map((item) => {
        const genreInfo = genresCount.find(
          (genre) => genre.genre === item.name
        );
        return (
          <li
            key={item.id}
            onClick={() => handleMusicGenre(item.name)}
            className="w-[23%] h-[500px] rounded-xl text-white flex flex-col justify-between   bg-center bg-cover max-[920px]:w-[47%] max-[920px]:h-[300px] cursor-pointer "
            style={{
              background: `url(${item.image_url})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="w-full p-2">
              <span className="font-semibold text-black w-[60px] border bg-white rounded-md border-blue-300 p-1 opacity-70">
                {genreInfo ? `${genreInfo.count}` : 0} tracks
              </span>
            </div>

            <div className="w-full h-[70px] rounded-lg flex gap-2 opacity-[100%] items-center bg-white bg-opacity-[30%] max-[920px]:text-2xl">
              <button className="text-5xl ">
                <AiOutlinePlayCircle />
              </button>
              <div className="text-white opacity-[100%]">
                <p className="font-bold text-2xl max-[920px]:text-base">
                  {item.name}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default GenreStaticList;
