import { parseCookies } from "nookies";
import { AiOutlinePlayCircle } from "react-icons/ai";
const GenreStaticList = () => {
  return (
    <ul className="flex gap-8">
      <li className="w-[23%] h-[500px] rounded-xl text-white flex flex-col justify-between   bg-center bg-cover bg-[url(https://i.pinimg.com/564x/ba/37/1c/ba371c38022a638ddc7a19b34148dfe4.jpg)]">
        <div className="w-full p-2">
          <span>11 tracks</span>
        </div>

        <div className="w-full h-[70px] rounded-lg flex gap-2 opacity-[100%] items-center bg-white bg-opacity-[30%]">
          <button>
            <AiOutlinePlayCircle className="text-5xl" />
          </button>
          <div className="text-white opacity-[100%]">
            <p>Release Radar</p>
            <span>LSLS</span>
          </div>
        </div>
      </li>

      <li className="w-[23%] h-[500px] rounded-xl text-white flex flex-col justify-between bg-center bg-cover bg-[url(https://img.freepik.com/fotos-gratis/mulher-caucasiana-feliz-ouvindo-musica-com-fones-de-ouvido-se-divertindo-em-pe-no-fundo-rosa-morena-fechou-os-olhos-e-segurou-o-telefone-nas-maos_197531-30195.jpg?w=740&t=st=1689784336~exp=1689784936~hmac=3304e40df4b435a12622dc497edf3803edc7a9ae16bd5aa6627e08b12a14944d)]">
        <div className="w-full p-2">
          <span>11 tracks</span>
        </div>

        <div className="w-full h-[70px] rounded-lg flex gap-2 opacity-[100%] items-center bg-white bg-opacity-[30%]">
          <button>
            <AiOutlinePlayCircle className="text-5xl" />
          </button>
          <div className="text-white opacity-[100%]">
            <p>Release Radar</p>
            <span>LSLS</span>
          </div>
        </div>
      </li>

      <li className="w-[23%] h-[500px] rounded-xl text-white flex flex-col justify-between   bg-center bg-cover bg-[url(https://img.freepik.com/fotos-gratis/mulher-jovem-com-corte-de-cabelo-afro-com-fones-de-ouvido-amarelos_273609-23050.jpg?w=900&t=st=1689785041~exp=1689785641~hmac=1484e6459a7c96cefa122d2820954555e8027cf620d24fd2b5def3c464a87317)]">
        <div className="w-full p-2">
          <span>11 tracks</span>
        </div>

        <div className="w-full h-[70px] rounded-lg flex gap-2 opacity-[100%] items-center bg-white bg-opacity-[30%]">
          <button>
            <AiOutlinePlayCircle className="text-5xl" />
          </button>
          <div className="text-white opacity-[100%]">
            <p>Release Radar</p>
            <span>LSLS</span>
          </div>
        </div>
      </li>

      <li className="w-[23%] h-[500px] rounded-xl text-white flex flex-col justify-between   bg-center bg-cover bg-[url(https://img.freepik.com/fotos-gratis/homem-sorridente-de-tiro-medio-usando-fones-de-ouvido_23-2149480753.jpg?w=900&t=st=1689784870~exp=1689785470~hmac=dfa1116a5f646e6823b2b2623b52d688619544e12dcc53236889c566e318679a)]">
        <div className="w-full p-2">
          <span>11 tracks</span>
        </div>

        <div className="w-full h-[70px] rounded-lg flex gap-2 opacity-[100%] items-center bg-white bg-opacity-[30%]">
          <button>
            <AiOutlinePlayCircle className="text-5xl" />
          </button>
          <div className="text-white opacity-[100%]">
            <p>Release Radar</p>
            <span>LSLS</span>
          </div>
        </div>
      </li>
    </ul>
  );
};
export default GenreStaticList;
