"client";
import { useMusic } from "@/hook";
import { musicData } from "@/schemas/music.schema";
import { useEffect, useState } from "react";

const ArtistList = () => {
  const { getMusic, music } = useMusic();
  const [artitst, setArtists] = useState(new Set());

  useEffect(() => {
    const songs: any = {};
    music.forEach((item) => {
      if (!songs[item.artist]) {
        songs[item.artist] = {
          id: item.id,
          cover_image: item.cover_image,
        };
      }
    });
    setArtists(songs);
  }, [music]);

  return (
    <ul className="w-full flex flex-wrap  gap-6 p-2">
      {Object.values(artitst).map((music) => (
        <li key={music.id} className="w-[140px] h-[140px]">
          <div className="w-full h-full">
            <img
              src={music.cover_image}
              className="w-full h-full rounded-md"
              alt=""
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ArtistList;
