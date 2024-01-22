import Loading from "@/app/components/Loading";
import { usePlayer } from "@/context/playerContext";
import { useUser } from "@/hook";

const YourPlaylist = () => {
  const { user, getUser } = useUser();

  const { setCurrentMusic, currentMusic, setPlaylist } = usePlayer();
  if (!user) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      {user.music.map((item) => (
        <li
          key={item.id}
          onClick={() => setCurrentMusic(item, true)}
          className="flex justify-between cursor-pointer"
        >
          <div className="w-[30%] max-[920px]:w-[40%] flex gap-2">
            <div className="w-[60px] h-[60px]">
              <img
                src={item.cover_image}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="">{item.name}</p>
            </div>
          </div>

          <div className="w-[30%]">
            <p>{item.artist}</p>
          </div>

          <div className="w-[9%]">
            <p>{item.artist}</p>
          </div>
        </li>
      ))}
    </>
  );
};

export default YourPlaylist;
