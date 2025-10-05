"use client";

import Rule from "./rule";
import getRandomWord from "./words";

export default class RuleQR extends Rule {
  word: string;
  qrUrl: string;

  constructor() {
    super(
      "Your password must contain the word you get when you scan this QR code.",
    );

    this.word = getRandomWord();

    this.qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${this.word}!&size=150x150`;

    this.renderItem = () => <QRDisplay imgSrc={this.qrUrl} />;

    this.check = (txt: string): boolean => {
      const r = new RegExp(`(${this.word})`, "i");
      return r.test(txt);
    };
  }
}

interface QRDisplayProps {
  imgSrc: string;
}

function QRDisplay({ imgSrc }: QRDisplayProps) {
  return (
    <div className="flex justify-center pt-4">
      <img
        src={imgSrc}
        alt="QR code"
        width={150}
        height={150}
        className="rounded-lg shadow-md border border-gray-300"
      />
    </div>
  );
}
