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
    <>
      {pathname === "/dashBoard" ||
      pathname === `/dashBoard/${result}` ||
      pathname === "/profile" ? (
        <>
          <header className="flex w-full h-10 items-center p-9   bg-[#053B89]">
            <SearchBar songs={music} />

            <DropDown />
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
