import localFont from "next/font/local";
import { Grandstander, Indie_Flower } from "next/font/google";

export const grandstander = Grandstander({
  subsets: ["vietnamese"],
  weight: ["400"],
  variable: "--font-grandstander",
});

export const IndieFlower = Indie_Flower({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-indie-flower",
});

export const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
