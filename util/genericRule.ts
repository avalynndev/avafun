import React from "react";
import { TextController } from "@/util/text-controller";
import JSXStyle from "styled-jsx/style";





export class GenericRule extends React.Component {
  static fulfilled = false;
  static instance: GenericRule | null = null;

  textController: TextController;
  text: string;

  static getInstance(): GenericRule | null {
    return this.instance;
  }

  constructor(props: any) {
    super(props);
    this.textController = TextController.getInstance();
    this.text = this.textController.getClear();
  }

  getHighlightString(): string {
    return this.textController.getHtml();
  }

  render(): JSX.Element | null {
    return null;
  }
}