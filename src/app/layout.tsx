import "../styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "@/context/authContext";
import { MusicProvider } from "@/context/musicContext";
import { PlayerProvider } from "@/context/playerContext";
import { UserProvider } from "@/context/userContext";
import ToastProvider from "@/context/ToastContext";
import { DndContext } from "@dnd-kit/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MusicPlay",
  description: "Made to you listen to good music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          boxSizing: "border-box",
          height: "100%",
        }}
      >
        <ToastProvider>
          <AuthProvider>
            <UserProvider>
              <MusicProvider>
                <PlayerProvider>
                  <Header />
                  {children}
                  <Footer />
                </PlayerProvider>
              </MusicProvider>
            </UserProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
