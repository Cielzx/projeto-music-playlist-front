import "../styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { AuthProvider } from "@/context/authContext";
import { MusicProvider } from "@/context/musicContext";
import { PlayerProvider } from "@/context/playerContext";

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
      <body className={inter.className}>
        <AuthProvider>
          <MusicProvider>
            <PlayerProvider>
              <Header />
              {children}
              <Footer />
            </PlayerProvider>
          </MusicProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
