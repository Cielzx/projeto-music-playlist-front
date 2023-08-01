import Link from "next/link";
import { FiTwitter } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className=" flex justify-between h-14 bg-black p-6">
      <div className="text-white h-full items-center flex justify-center gap-8">
        <Link href={""}>Sobre nós</Link>

        <Link href={""}>Nos contate</Link>
      </div>

      <div className="flex gap-8 items-center text-white text-2xl">
        <FiTwitter />
        <FiInstagram />
      </div>
    </footer>
  );
};

export default Footer;
