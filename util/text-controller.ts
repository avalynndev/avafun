import _ from "lodash";
import sanitizeHtml from "sanitize-html";

type TextUpdateFunction = (() => void) | null;

export class TextController {
  static instance: TextController = new TextController();
  rawText: string;
  textUpdateFunction: TextUpdateFunction;
  htmlText: string;
  clearText: string;
  editor: any; // Replace with the actual type of editor you are using

  constructor() {
    this.rawText = "";
    this.htmlText = "";
    this.clearText = "";
    this.textUpdateFunction = null;
  }

  static getInstance(): TextController {
    return this.instance;
  }

  setTextUpdateFunction(textUpdateFunction: TextUpdateFunction): void {
    this.textUpdateFunction = textUpdateFunction;
  }

  updateText(text: string): void {
    this.rawText = text;
    this.clearText = decodeHTML(
      sanitizeHtml(this.rawText, { allowedTags: [] }),
    );
    this.htmlText = sanitizeHtml(this.rawText, {
      allowedTags: ["b", "i", "em", "strong", "p", "br", "div", "span"],
      allowedAttributes: { span: ["style", "font-family", "font-size"] },
      parseStyleAttributes: false,
    });

    if (this.textUpdateFunction) this.textUpdateFunction();
  }

  updateEditorContent(): void {
    if (!this.editor) return;

    const selection = this.editor.state.selection;

    this.editor.chain().setContent(this.htmlText).run();
    this.editor.chain().focus().setTextSelection(selection).run();
  }

  startFire(): void {
    let text = this.clearText;
    const fireStartingIndex = Math.ceil(Math.random() * text.length);
    text = stringReplaceAtWithFire(text, fireStartingIndex);
    this.updateText(text);
    if (this.editor) this.updateEditorContent();

    let prev = fireStartingIndex - 1;
    let next = fireStartingIndex + 3;
    let isNextFinished = false;

    const fireInterval = setInterval(() => {
      text = this.clearText;

      if ((prev === 0 && isNextFinished) || stringHasNoFire(text)) {
        console.log("Burn finished!");
        clearInterval(fireInterval);
        return;
      }

      prev = text.indexOf("🔥");

      if (prev > 0) {
        text = stringReplaceAtWithFire(text, prev - 1);
      }

      next = text.lastIndexOf("🔥");
      isNextFinished = next === text.length - 2;

      if (next <= text.length - 1 && !isNextFinished) {
        prev === -1 ? (next += 1) : (next += 2);
        text = stringReplaceAtWithFire(text, next);
      }

      this.updateText(text);
      if (this.editor) this.updateEditorContent();
    }, 1000);
  }

  getClear(): string {
    return this.clearText;
  }

  getHtml(): string {
    return this.htmlText;
  }

  getTrueClearLength(): number {
    return _.toArray(this.clearText).length;
  }
}

function stringReplaceAtWithFire(s: string, index: number): string {
  return s.slice(0, index) + "🔥" + s.slice(index + 1);
}

function stringHasNoFire(s: string): boolean {
  return !s.includes("🔥");
}

function decodeHTML(s: string): string {
  return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
