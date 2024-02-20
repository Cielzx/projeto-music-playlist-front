"use client";
import { BsFilterLeft, BsMusicNoteList } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface musicInfo {
  id: string;
  name: string;
  artist: string;
  album: string;
  genre: string;
  cover_image: string;
  year: string;
}

interface SearchProp {
  songs: musicInfo[];
}

const SearchBar = ({ songs }: SearchProp) => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  let filteredSongs = songs.filter((song) =>
    song.name.toLowerCase().includes(search.toLocaleLowerCase())
  );
  if (search == "") {
    filteredSongs = [];
  }
  const handleMusicId = (id: string) => {
    setSearch("");
    router.push(`/dashBoard/${id}`);
  };

  const genres = [
    { id: 1, genre: "Rap" },
    { id: 2, genre: "Pop" },
    { id: 3, genre: "Rock" },
  ];

  return (
    <div className="flex w-[100%] max-[920px]:gap-2 items-center">
      <div
        className="w-[10%] flex justify-center h-full items-center cursor-pointer text-white text-2xl gap-1 max-[920px]:w-[15%]"
        onClick={() => router.push("/dashBoard")}
      >
        <BsMusicNoteList className="text-4xl" />
      </div>

      <div className="flex items-center border border-1 border-blue-400 rounded-full w-[88%] h-12 text-white  p-4 gap-2 bg-gradient-to-r from-blue-950 to-blue-900 max-[920px]:w-[80%]">
        <div>
          <AiOutlineSearch className="text-3xl" />
        </div>

        <div className="w-full flex ">
          <div className="w-[69%]">
            <input
              placeholder="Pesquisar"
              className="w-full bg-transparent placeholder-white outline-none rounded-full text-white text-start"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredSongs.length > 0 ? (
            <div className="w-full  bg-[#053B89] bg-opacity-60  z-10  border-2 border-blue-300 p-4 rounded-lg right-[28rem]">
              <ul className="w-full h-full overflow-auto flex flex-col gap-6">
                {filteredSongs.map((item) => (
                  <li
                    onClick={() => handleMusicId(item.id)}
                    key={item.id}
                    className="w-full cursor-pointer flex gap-3"
                  >
                    <div className="w-[100px] h-[100px]">
                      <img
                        src={item.cover_image}
                        className="w-full h-full"
                        alt=""
                      />
                    </div>
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="flex gap-4 max-[920px]:hidden">
          {genres.map((item) => (
            <div
              key={item.id}
              className="w-20 h-8 bg-opacity-0 border border-1 border-blue-300 rounded-lg flex justify-center items-center"
            >
              <span
                onClick={() => router.push(`/playlist/${item.genre}`)}
                className="cursor-pointer"
              >
                {item.genre}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
