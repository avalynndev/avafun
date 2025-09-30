import { Grandstander, Indie_Flower, Roboto_Condensed } from "next/font/google";
import localFont from "next/font/local";

export const grandstander = Grandstander({
  subsets: ["vietnamese"],
  weight: ["400"],
  variable: "--font-grandstander",
});

export const robotoCondensed = Roboto_Condensed({
  subsets: ["vietnamese"],
  weight: ["200"],
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
