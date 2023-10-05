import CustomModal from "@/app/components/Modal";
import { useMusic } from "@/hook";
import { ImMusic } from "react-icons/im";
import { useDropzone } from "react-dropzone";

interface modalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadMusicModal = ({ isOpen, onClose }: modalProps) => {
  const { setPage, musicInfo, setMusicInfo, setNewMusic, mode, newMusic } =
    useMusic();
  const onDrop = (files: File[]) => {
    setNewMusic(files[0]);
  };

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
    },
  });
  const { getRootProps, getInputProps } = dropzone;

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      MaxWidthBody="100%"
      MaxWidthHeader="100%"
      widthBody="1200px"
      widthHeader="1200px"
    >
      {mode === "music" ? (
        <div className="w-full flex justify-center text-white p-2">
          <div className="w-full flex flex-col justify-center">
            <p className="text-4xl my-6 font-semibold text-center">
              Salvar música
            </p>
            <div className="flex flex-row justify-center mb-6">
              <div className=" bg-blue-400 w-5 h-5 m-1 rounded-full"></div>
              <div className=" bg-gray-400 w-5 h-5 m-1 rounded-full"></div>
            </div>
            <div className="flex flex-row w-full justify-center">
              <div className=" flex flex-col w-[648px] h-[410px] bg-blue-900 rounded-lg border-dashed border-2 border-gray-400 max-[920px]:w-[100%]">
                <label
                  htmlFor="dropzone-file"
                  className="cursor-pointer w-full h-full"
                >
                  <div
                    {...getRootProps()}
                    className="flex flex-col items-center pt-5 pb-6 w-full h-full gap-2"
                  >
                    <ImMusic className="fill-gray-200 w-16 h-16 m-4" />

                    <p className="text-3xl max-[920px]:text-sm">
                      Arrasta e solte o áudio aqui
                    </p>

                    <p className="text-3xl mt-4 max-[920px]:text-base">
                      - OU -
                    </p>
                    <button
                      className="user-form-button w-48 my-8 max-[920px]:w-[70%] max-[920px]:text-sm"
                      onClick={(e) => e.preventDefault()}
                    >
                      Busque aqui
                    </button>

                    {newMusic ? (
                      <>
                        <div className="w-[100%]  text-center">
                          <p className="text-lg">Musica: {newMusic.name}</p>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    <p className="text-lg italic font-gray-200">
                      Áudios suportados: MP3
                    </p>
                  </div>
                </label>
                <input className="hidden" {...getInputProps()} />
              </div>
              <div className="w-[50%] h-[410px] justify-center">
                <div className="pl-6">
                  <label htmlFor="name" className="user-form-label">
                    Nome
                  </label>
                  <div className="mt-2 mb-12">
                    <input
                      type="text"
                      className="user-form-input"
                      value={musicInfo.name}
                      onChange={(e) => {
                        setMusicInfo({ ...musicInfo, name: e.target.value });
                      }}
                      placeholder="Iron man"
                    />
                  </div>
                  <div>
                    <label htmlFor="album" className="user-form-label">
                      Album
                    </label>
                    <div className="mt-2 mb-12">
                      <input
                        type="text"
                        className="user-form-input"
                        value={musicInfo.album}
                        onChange={(e) => {
                          setMusicInfo({ ...musicInfo, album: e.target.value });
                        }}
                        placeholder="Paranoid"
                      />
                    </div>
                    <div>
                      <label htmlFor="name" className="user-form-label">
                        Artista
                      </label>
                      <div className="mt-2 mb-12">
                        <input
                          type="text"
                          className="user-form-input"
                          value={musicInfo.artist}
                          onChange={(e) => {
                            setMusicInfo({
                              ...musicInfo,
                              artist: e.target.value,
                            });
                          }}
                          placeholder="Black Sabbath"
                        />
                      </div>

                      <div className="w-[100%] flex justify-end">
                        <button
                          className="user-form-button w-32"
                          onClick={() => {
                            setPage((currPage) => currPage + 1);
                          }}
                        >
                          Próximo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </CustomModal>
  );
};

export default UploadMusicModal;
