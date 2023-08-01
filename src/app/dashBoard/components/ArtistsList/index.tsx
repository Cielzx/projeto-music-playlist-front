import { useMusic } from "@/hook";

const ArtistList = () => {
  const { getMusic, music } = useMusic();
  return (
    <ul className="w-full flex flex-wrap  gap-6 p-2">
      {music.map((music) => (
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
