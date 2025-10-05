import React, { useRef, useEffect, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface CaretPosition {
  start: number;
  end: number;
}

interface PasswordBoxProps {
  pswd: string;
  setPswd: (value: string) => void;
}

function getCaretPosition(el: HTMLTextAreaElement): CaretPosition {
  if (el.selectionStart || el.selectionStart === 0) {
    return {
      start: el.selectionStart,
      end: el.selectionEnd || 0,
    };
  }
  return { start: 0, end: 0 };
}

function setCaretPosition(el: HTMLTextAreaElement | null, pos?: CaretPosition) {
  if (el && pos && el.setSelectionRange) {
    el.setSelectionRange(pos.start, pos.end);
  }
}

const PasswordBox = forwardRef<HTMLTextAreaElement, PasswordBoxProps>(
  ({ pswd, setPswd }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const textareaRef =
      (ref as React.RefObject<HTMLTextAreaElement>) || internalRef;
    const caretPos = useRef<CaretPosition | undefined>(undefined);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    }, [pswd, textareaRef]);

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      if (textareaRef.current) {
        caretPos.current = getCaretPosition(textareaRef.current);
      }
      setPswd(e.target.value);
    }

    useEffect(() => {
      if (textareaRef.current) {
        setCaretPosition(textareaRef.current, caretPos.current);
      }
    }, [pswd, textareaRef]);

    return (
      <div className="w-full pb-2">
        <div className="flex items-center justify-between mb-2 px-1 text-sm font-medium text-muted-foreground">
          <span>Choose a password</span>
          <span>{pswd.length}</span>
        </div>

        <textarea
          id="pswdbox"
          ref={textareaRef}
          value={pswd}
          onChange={handleChange}
          rows={1}
          spellCheck={false}
          className={cn(
            "w-full resize-none overflow-hidden rounded-md border border-input bg-background",
            "px-3 py-2 text-base leading-relaxed",
            "shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-shadow",
          )}
        />
      </div>
    );
  },
);

PasswordBox.displayName = "PasswordBox";

export default PasswordBox;
