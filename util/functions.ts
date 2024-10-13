export function getAllRegexMatches(text: string, regex: RegExp): string[] {
  const matches = text.match(regex);
  if (matches) {
    return matches;
  }
  return [];
}

export function getFormattedStringsInText(
  format: string,
  text: string,
): string[] {
  const formatClose = format.split(" ")[0];
  let zones = text
    .split(new RegExp(`<[^/]*?${format}.*?>`))
    .slice(1)
    .filter((elem) => elem.includes(`</${formatClose}>`));
  let formatted: string[] = [];

  zones.forEach((rawArea) => {
    formatted.push(rawArea.split(`</${formatClose}>`)[0]); // left part of </format>
  });

  return formatted;
}

export function getSubstringsWithFont(font: string, text: string): string[] {
  return getFormattedStringsInText(
    `span style="[^"]*font-family: ${font}.*?"`,
    text,
  );
}

export function getSpanListFromHtmlText(
  htmlText: string,
): NodeListOf<HTMLSpanElement> {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlText;
  return tempDiv.querySelectorAll("span");
}

export function extractAndMergeTextWithFontSizes(content: any): {
  [fontSize: string]: string;
} {
  const textWithFontSizes: { [fontSize: string]: string } = {};

  function traverse(node: any): void {
    if (node.type === "text") {
      if (!node.text.length) return;

      let fontSize = "28";

      if (node.marks) {
        node.marks.forEach((mark: any) => {
          if (mark.type === "textStyle" && mark.attrs.fontSize) {
            fontSize = mark.attrs.fontSize.replace("px", "");
          }
        });
      }

      if (!textWithFontSizes[fontSize]) {
        textWithFontSizes[fontSize] = "";
      }

      const textToAdd = typeof node.text === "string" ? node.text : "";

      textWithFontSizes[fontSize] += textToAdd;
    } else if (node.content) {
      node.content.forEach(traverse);
    }
  }

  traverse(content);

  return textWithFontSizes;
}

export function generateHighlightString(
  text: string,
  highlight: RegExp,
  antihighlight: string = "",
): string {
  const regexSimpleMarkup = /(<[^>]+>)/g;
  const markupSplit = text
    .split(regexSimpleMarkup)
    .filter((elem) => elem.length > 0);
  const antihighlightCloseTag = antihighlight.split(" ")[0];
  let dontHighlight = false;
  let resultText = "";

  markupSplit.forEach((part) => {
    const matchesAntiHighlight = new RegExp(`<${antihighlight}>`).test(part);

    if (
      matchesAntiHighlight ||
      (dontHighlight && part === `</${antihighlightCloseTag}>`)
    ) {
      dontHighlight = !dontHighlight;
    }

    if ((part.startsWith("<") && part.endsWith(">")) || dontHighlight) {
      resultText += part;
    } else {
      resultText += part.replace(
        highlight,
        '<span class="error-highlight">$&</span>',
      );
    }
  });

  return resultText;
}
