import { IoIosAlbums } from "react-icons/io";
import { FaHeadphonesAlt } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import Header from "../components/Header/Header";

const discoverPage = () => {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen  backgroundImage">
      <section className="flex h-full justify-end p-4 max-[920px]:flex-col max-[920px]:gap-4">
        <div className="flex flex-col gap-7">
          <h1 className="text-white text-4xl ">Descubra novas musicas</h1>

          <div className="flex gap-4 ">
            <div className="flex rounded-md bg-gray-400 bg-opacity-[70%] w-[80px] h-[80px] justify-center items-center text-white text-5xl">
              <BsFillPlayFill />
            </div>
            <div className="flex rounded-md bg-gray-400 bg-opacity-[70%] w-[80px] h-[80px] justify-center items-center text-white text-5xl">
              <FaHeadphonesAlt />
            </div>
            <div className="flex rounded-md bg-gray-400 bg-opacity-[70%] w-[80px] h-[80px] justify-center items-center text-white text-5xl">
              <IoIosAlbums />
            </div>
          </div>

          <div className="w-5/6">
            <h2 className="text-white text-xl">
              Cadastre-se e você podera escutar os ultimos albuns e músicas
              lançadas.
            </h2>
          </div>
        </div>

        <div className="w-[70%] flex flex-wrap gap-2 max-[920px]:hidden">
          <img
            className="w-[250px] h-[250px]"
            src="https://i.pinimg.com/564x/39/c5/62/39c562d0c123ef4467e94fb13fb4fae3.jpg"
            alt=""
          />
          <img
            className="w-[250px] h-[250px]"
            src="https://i.pinimg.com/564x/39/c5/62/39c562d0c123ef4467e94fb13fb4fae3.jpg"
            alt=""
          />
          <img
            className="w-[250px] h-[250px]"
            src="https://i.pinimg.com/564x/39/c5/62/39c562d0c123ef4467e94fb13fb4fae3.jpg"
            alt=""
          />
          <img
            className="w-[250px] h-[250px]"
            src="https://i.pinimg.com/564x/39/c5/62/39c562d0c123ef4467e94fb13fb4fae3.jpg"
            alt=""
          />
        </div>
      </section>
    </main>
  );
};

export default discoverPage;
