"use client";
import { useAuth, useMusic, useUser } from "@/hook";
import YourMusicList from "../dashBoard/components/YourMusicList";
import { AiOutlineUpload } from "react-icons/ai";
import UploadProfileImageModal from "./components/ImageModal";
import { useDisclosure } from "@chakra-ui/react";
import UploadMusicModal from "../dashBoard/components/UploadModal/MusicModal";
import UploadImageModal from "../dashBoard/components/UploadModal/ImageModal";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { userDescription } from "@/context/userContext";
import Container from "../components/Container/container";
import { useState } from "react";

const ProfilePage = () => {
  const { register, handleSubmit } = useForm();
  const { setMode, page, mode } = useMusic();
  const [width, setWidth] = useState("");
  const { updateDescription, description } = useUser();
  const { user } = useUser();

  const { onOpen, onClose, isOpen } = useDisclosure();

  const onSub = (data: any) => {
    updateDescription(data);
    setMode("");
  };

  if (!user) {
    return <></>;
  }

  let initials = "";
  const names = user.name.split(" ");

  if (names && names.length > 0) {
    const firstName = names[0];
    initials += firstName.charAt(0).toUpperCase();
  }

  if (names && names?.length > 1) {
    const lastName = names[names.length - 1];
    initials += lastName.charAt(0).toUpperCase();
  }

  return (
    <main className="flex  items-center justify-center text-white backgroundDash">
      <Container>
        <section className="w-full mt-6 min-h-screen flex flex-col gap-12 justify-center items-center p-4">
          <div className="w-full flex justify-start">
            <Link
              href={"/dashBoard"}
              className="btn-primary text-white hover:bg-opacity-25"
            >
              Voltar
            </Link>
          </div>

          <div className=" bg-[#120a8f] bg-opacity-10 w-full p-4 text-white rounded-lg border-2 border-blue-300">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between w-full ">
                <div className="w-24 h-24 bg-pink-400 text-2xl  rounded-full bg-gray-900 max-[920px]:h-20  ">
                  {user.profile_image ? (
                    <img
                      src={user.profile_image}
                      className="rounded-full object-cover"
                      alt=""
                    />
                  ) : (
                    <p className="w-full h-full flex justify-center items-center text-5xl text-white">
                      {initials}
                    </p>
                  )}
                </div>
                {user.profile_image ? (
                  <>
                    {" "}
                    <button
                      onClick={() => {
                        setMode("profile");
                        onOpen();
                      }}
                      className="w-[300px] flex gap-2 justify-center items-center max-[920px]:w-[200px]"
                    >
                      <AiOutlineUpload className="text-3xl" />{" "}
                      <p className="text-2xl max-[920px]:text-sm">
                        Atualizar foto de perfil
                      </p>
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <button
                      onClick={() => {
                        setMode("profile");
                        onOpen();
                      }}
                      className="w-[300px] flex gap-2 justify-center items-center"
                    >
                      <AiOutlineUpload className="text-3xl" />{" "}
                      <p className="text-2xl max-[920px]:text-base">
                        Adicionar foto de perfil
                      </p>
                    </button>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-4 border-2 border-white w-full p-2 rounded-md">
                <div className="flex flex-col w-full gap-4">
                  <h3 className="text-white text-xl">Seu nome</h3>

                  <div className="flex flex-col w-full gap-4">
                    {mode === "name" ? (
                      <form
                        onSubmit={handleSubmit(onSub)}
                        className="w-full flex justify-between "
                      >
                        <input
                          type="text"
                          className=" w-[300px] h-[50px] max-[920px]:w-[50%] rounded-md outline-none bg-transparent border-2 border-blue-200 p-2"
                          defaultValue={user.name}
                          id="name"
                          {...register("name")}
                        />

                        <button className=" w-[300px] h-[50px] max-[920px]:w-[50%] h-[50px] border-2 border-blue-200 rounded-lg text-xl  ">
                          Atualizar
                        </button>
                      </form>
                    ) : (
                      <div className="flex justify-between">
                        <p className="text-2xl">{user.name}</p>
                        <button
                          onClick={() => setMode("name")}
                          className="w-[300px] h-[50px] max-[920px]:w-[50%] h-[50px] border-2 border-blue-200 rounded-lg text-xl "
                        >
                          Atualizar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col w-full gap-4">
                  <h3 className="text-white text-xl">Email</h3>
                  <p className="text-2xl">{user.email}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-2 border-white w-full p-2 rounded-md">
                <div className="flex flex-col w-full gap-4">
                  <h3 className="text-white text-xl">Descrição</h3>
                  <div className="flex flex-col w-full gap-4">
                    {mode === "description" ? (
                      <form
                        onSubmit={handleSubmit(onSub)}
                        className="w-full flex justify-between gap-2 max-[920px]:flex-col "
                      >
                        <input
                          type="text"
                          className="w-[50%] rounded-md outline-none bg-transparent border-2 border-blue-200 p-2"
                          defaultValue={user.description}
                          id="description"
                          {...register("description")}
                        />

                        <button className="w-[300px] h-[50px] max-[920px]:w-[50%] h-[50px] border-2 border-blue-200 rounded-lg text-xl ">
                          Atualizar
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center justify-between max-[920px]:flex-col">
                        {user.description ? (
                          <>
                            {" "}
                            <p className="text-2xl max-[920px]:text-base">
                              {user.description}
                            </p>
                            <button
                              onClick={() => setMode("description")}
                              className="w-[300px] h-[50px] max-[920px]:w-[50%]] h-[50px] border-2 border-blue-200 rounded-lg text-xl "
                            >
                              Atualizar
                            </button>
                          </>
                        ) : (
                          <>
                            {" "}
                            <p className="text-2xl">Sem descrição...</p>
                            <button
                              onClick={() => setMode("description")}
                              className="w-[300px] h-[50px] border-2 border-blue-200 rounded-lg text-xl "
                            >
                              Adicionar
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-blue-300 text-white w-full  p-4 text-black rounded-lg">
            <div className="flex flex-col gap-8">
              <div className="w-full flex justify-between">
                <h2 className="text-3xl max-[920px]:text-2xl">Suas músicas</h2>
                <button
                  onClick={() => {
                    setMode("music");
                    onOpen();
                  }}
                  className="btn-primary w-40 h-10"
                >
                  Adicionar música
                </button>
              </div>

              <YourMusicList music={user.music} />
            </div>
          </div>

          <form>
            <UploadProfileImageModal onClose={onClose} isOpen={isOpen} />
          </form>

          {mode === "music" ? (
            <form>
              <UploadMusicModal onClose={onClose} isOpen={isOpen} />
              {page == 1 ? (
                <>
                  <UploadImageModal onClose={onClose} isOpen={isOpen} />
                </>
              ) : (
                <></>
              )}
            </form>
          ) : (
            <></>
          )}
        </section>
      </Container>
    </main>
  );
};

export default ProfilePage;
