"use client";
import MusicContainer from "@/app/components/MusicContainer";
import { useMusic } from "@/hook";
import { useEffect } from "react";

const Music = ({ params }: { params: { id: string } }) => {
  const { music, getMusic } = useMusic();

  useEffect(() => {
    getMusic();
  }, []);

  return (
    <main className=" min-h-screen  items-center backgroundDash p-2">
      <div className=" flex items-center justify-center">
        <MusicContainer id={params.id} />;
      </div>
    </main>
  );
};

export default Music;
