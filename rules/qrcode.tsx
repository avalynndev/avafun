"use client";

import { useEffect, useState } from "react";
import Rule from "./rule";
import getRandomWord from "./words";

async function getQR(word: string): Promise<string> {
  // API that generates QR codes
  let url = `https://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=150x150`;
  url = "https://api.allorigins.win/get?url=" + encodeURIComponent(url); // CORS proxy

  const response = await fetch(url);
  const data = await response.json();

  return data.contents; // QR code image
}

export default class RuleQR extends Rule {
  word: string;
  objectURL: string | null = null;

  constructor() {
    super("Your password must contain the word you get when you scan this QR code.");

    this.word = getRandomWord();
    console.log("QR word:", this.word);

    getQR(this.word)
      .then((objectURL) => {
        this.objectURL = objectURL;
      })
      .catch((error) => console.error(error));

    this.renderItem = () => <QRDisplay imgSrc={this.objectURL} />;

    this.check = (txt: string): boolean => {
      const r = new RegExp(`(${this.word})`, "i");
      return r.test(txt);
    };
  }
}


interface QRDisplayProps {
  imgSrc: string | null;
}

function QRDisplay({ imgSrc }: QRDisplayProps) {
  const [src, setSrc] = useState<string | null>(null);

  // ensure re-render once objectURL is updated
  useEffect(() => {
    if (imgSrc) setSrc(imgSrc);
  }, [imgSrc]);

  return (
    <div className="flex justify-center pt-4">
      {src ? (
        <img
          src={src}
          alt="QR code"
          width={150}
          height={150}
          className="rounded-lg shadow-md border border-gray-300"
        />
      ) : (
        <p className="text-gray-500 text-sm">Loading QR...</p>
      )}
    </div>
  );
}
