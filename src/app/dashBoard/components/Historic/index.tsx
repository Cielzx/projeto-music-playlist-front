"use client";
import { Tooltip } from "@chakra-ui/react";
import { useMusic } from "@/hook";

const Historic = () => {
  const { getUserHistoric, historic, deleteHistoric } = useMusic();

  getUserHistoric();
  return (
    <ul className="flex w-[103%] flex-wrap h-[500px] gap-2 p-2 overflow-x-auto text-white">
      {historic && historic.length > 0 ? (
        historic.map((history) => (
          <li
            key={history.id}
            className="w-[400px] h-[390px]  border-2 border-blue-400 flex flex-col gap-4 p-2 rounded-md"
          >
            <div className="w-[100%] h-[200px] flex flex-col gap-2">
              <img
                src={history.cover_image}
                className="w-full h-[200px] object-cover"
                alt=""
              />
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-[1rem] ">{history.music_name}</p>
              <span className="text-[1rem] ">{history.artist}</span>
            </div>

            <div className="flex h-full justify-end items-center p-2">
              <Tooltip
                hasArrow
                label="Remover"
                bg="black"
                color="white"
                fontSize="sm"
                placement="top"
              >
                <button
                  onClick={() => deleteHistoric(history.id)}
                  className="text-xl"
                >
                  X
                </button>
              </Tooltip>
            </div>
          </li>
        ))
      ) : (
        <div className="w-[100%] h-[500px] flex justify-center items-center ">
          <div className=" flex flex-col">
            <p className="text-5xl max-[920px]:text-4xl">Sem historico...</p>
          </div>
        </div>
      )}
    </ul>
  );
};

export default Historic;
