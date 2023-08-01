"use client";
import { BsFilterLeft, BsMusicNoteList } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { parseCookies } from "nookies";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const cookies = parseCookies();

  if (!cookies["user.Token"] && pathname === "/dashBoard") {
    console.log("Sem Token bobinho");
    router.push("/");
  }

  return (
    <>
      {pathname === "/dashBoard" || "dashBoard/id" ? (
        <>
          <header className="flex w-full h-10 items-center p-9   bg-[#053B89]">
            <div className="w-[10%] flex justify-center h-full items-center text-white text-2xl gap-1">
              <BsMusicNoteList className="text-4xl" />
            </div>

            <div className="flex items-center border border-1 border-blue-400 rounded-full w-[80%] h-12 text-white  p-4 gap-2 bg-gradient-to-r from-blue-950 to-blue-900">
              <div>
                <AiOutlineSearch className="text-3xl" />
              </div>

              <div className="w-[69%]">
                <input
                  placeholder="Pesquisar"
                  className="w-full bg-transparent placeholder-white outline-none rounded-full text-white text-start"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-20 h-8 bg-opacity-0 border border-1 border-blue-300 rounded-lg flex justify-center items-center">
                  <span className="">Minimal</span>
                </div>
                <div className="w-20 h-8 bg-opacity-0 border border-1 border-blue-300 rounded-lg flex justify-center items-center">
                  <span className="">Pop</span>
                </div>
                <div className="w-20 h-8 bg-opacity-0 border border-1 border-blue-300 rounded-lg flex justify-center items-center">
                  <span className="">Rock</span>
                </div>
              </div>

              <button className="flex gap-2 justify-center items-center h-full">
                <BsFilterLeft className="text-3xl" />
                Filters
              </button>
            </div>

            <div className="w-[10%] flex justify-center items-center">
              <div className="w-[50px] h-[50px]  rounded-full">
                <div>
                  <img
                    src="https://i.pinimg.com/564x/d6/e1/0a/d6e10a79f543530e51c36f3c421299df.jpg"
                    className="w-full h-full rounded-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </header>
        </>
      ) : (
        <>
          <header className="flex w-full h-10 items-center justify-between backgroundImage p-4">
            <div className="flex justify-center h-full items-center text-white text-2xl gap-1">
              <BsMusicNoteList />
              MusicPlay
            </div>

            <div className="flex gap-8 text-white text-2xl">
              {pathname === "/discoverPage" ? (
                <>
                  <Link href={"/"}>Home</Link>

                  <Link href={"/login"}>Login</Link>
                </>
              ) : (
                <>
                  <Link href={"discoverPage"}>Descubra</Link>

                  <Link href={"/login"}>Login</Link>
                </>
              )}
            </div>
          </header>
        </>
      )}
    </>
  );
};

export default Header;
