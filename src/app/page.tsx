import Header from "./components/Header/Header";
import Container from "./components/Container/container";
import { Button, ButtonGroup } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex  min-h-screen  justify-center items-end backgroundImage">
      <section className="flex justify-end justify-center">
        <div>
          <Image
            src="/imageMusicHearing.png"
            alt="Homem ouvindo musica"
            width={500}
            height={200}
          />
        </div>

        <div className="flex  justify-center ">
          <div className="flex flex-col items-start p-6 gap-4">
            <h1 className="text-white text-5xl">Sinta a música</h1>
            <p className="text-white text-3xl">
              Escute suas músicas favoritas aqui com apenas um clique
            </p>
            <Link
              href={"/login"}
              className="w-44 flex justify-center items-center rounded-md text-center text-3xl text-white h-14 bg-blue-500"
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* <section className=" flex  justify-center w-4/6">
        
      </section> */}
    </main>
  );
}
