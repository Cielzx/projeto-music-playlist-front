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

  return (
    <>
      <div className="w-[10%] flex justify-center h-full items-center text-white text-2xl gap-1">
        <BsMusicNoteList className="text-4xl" />
      </div>

      <div className="flex items-center border border-1 border-blue-400 rounded-full w-[80%] h-12 text-white  p-4 gap-2 bg-gradient-to-r from-blue-950 to-blue-900">
        <div>
          <AiOutlineSearch className="text-3xl" />
        </div>

        <div className="w-[69%]">
          <input
            placeholder="Pesquisar"
            className="w-full bg-transparent placeholder-white outline-none rounded-full text-white text-start"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredSongs.length > 0 ? (
          <>
            <div className="w-full h-[400px] bg-[#053B89] bg-opacity-60  relative top-[227px] border-2 border-blue-300 p-4 rounded-lg right-[28rem]">
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
          </>
        ) : (
          <></>
        )}

        <div className="flex gap-4">
          <div className="w-20 h-8 bg-opacity-0 border border-1 border-blue-300 rounded-lg flex justify-center items-center">
            <span className="">Minimal</span>
          </div>
          <div className="w-20 h-8 bg-opacity-0 border border-1 border-blue-300 rounded-lg flex justify-center items-center">
            <span className="">Pop</span>
          </div>
          <div className="w-20 h-8 bg-opacity-0 border border-1 border-blue-300 rounded-lg flex justify-center items-center">
            <span className="">Rock</span>
          </div>
        </div>

        <button className="flex gap-2 justify-center items-center h-full">
          <BsFilterLeft className="text-3xl" />
          Filters
        </button>
      </div>
    </>
  );
};

export default SearchBar;
