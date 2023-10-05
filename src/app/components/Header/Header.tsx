"use client";
import { BsFilterLeft, BsMusicNoteList } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { parseCookies } from "nookies";
import DropDown from "../DropDown/dropdownUser";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect } from "react";
import { useMusic, useUser } from "@/hook";
import { UserContext } from "@/context/userContext";
import SearchBar from "../SearchBar";

const Header = () => {
  const { getUser } = useContext(UserContext);
  const { music } = useMusic();
  const pathname = usePathname();

  const router = useRouter();
  const cookies = parseCookies();

  const url = pathname.split("/");
  const result = url.slice(2).join("/");

  if (!cookies["user.Token"] && pathname === "/dashBoard") {
    router.push("/");
  }

  useEffect(() => {
    getUser();
  }, [pathname]);

  return (
    <div className="flex flex-col justify-center  items-center  max-sm:w-full max-[1024px]:w-full max-[1560px]:w-full max-[2560px]:w-full bg-[#053B89]">
      {pathname === "/dashBoard" ||
      pathname === `/dashBoard/${result}` ||
      pathname === "/profile" ? (
        <>
          <header className="flex w-full h-10 items-center p-9 bg-[#053B89] max-[920px]:h-[70px] max-lg:p-5 max-[1560px]:w-full max-[2560px]:w-[75%] max-[3440px]:w-[75%] ">
            {pathname === "/profile" ? (
              <>
                <div className="w-[90%] flex justify-between h-full items-center text-white text-2xl gap-1">
                  <BsMusicNoteList className="text-4xl" />

                  <p className="text-3xl">MusicPlay</p>
                </div>
              </>
            ) : (
              <>
                <SearchBar songs={music} />
              </>
            )}

            <DropDown />
          </header>
        </>
      ) : (
        <>
          <header className="flex w-full h-10 items-center justify-between backgroundImage p-4 max-lg:p-5 max-[1560px]:w-full max-[2560px]:w-[60%] max-[3440px]:w-[50%]">
            <div className="flex justify-center h-full items-center text-white text-2xl gap-1 max-[920px]:hidden">
              <BsMusicNoteList />
              MusicPlay
            </div>

            <div className="flex gap-8 text-white text-2xl max-[920px]:justify-between max-[920px]:w-full">
              {pathname === "/discoverPage" ? (
                <>
                  <Link href={"/"}>Home</Link>

                  <Link href={"/login"}>Login</Link>
                </>
              ) : (
                <>
                  <Link href={"discoverPage"}>Descubra</Link>

                  {pathname === "/login" ? (
                    <>
                      <Link href={"/"}>Home</Link>
                    </>
                  ) : (
                    <>
                      <Link href={"/login"}>Login</Link>
                    </>
                  )}
                </>
              )}
            </div>
          </header>
        </>
      )}
    </div>
  );
};

export default Header;
