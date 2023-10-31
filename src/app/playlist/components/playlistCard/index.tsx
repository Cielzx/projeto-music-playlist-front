"use client";
import { useMusic } from "@/hook";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface cardProp {
  genre: string;
}

const PlaylistCard = ({ genre }: cardProp) => {
  const { getMusic, music } = useMusic();

  const pathname = usePathname();
  useEffect(() => {
    getMusic(genre);
  }, [pathname]);
  return (
    <>
      {music &&
        music.map((item) => (
          <li key={item.id} className="flex justify-between">
            <div className="w-[30%] flex gap-2">
              <div className="w-[60px] h-[60px]">
                <img
                  src={item.cover_image}
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              <div className="flex flex-col gap-2">
                <p>{item.name}</p>
              </div>
            </div>

            <div className="w-[30%]">
              <p>{item.artist}</p>
            </div>

            <div className="w-[9%]">
              <p>{item.album}</p>
            </div>
          </li>
        ))}
    </>
  );
};

export default PlaylistCard;
