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
  } else {
    return {
      start: 0,
      end: 0,
    };
  }
}

function setCaretPosition(
  el: HTMLTextAreaElement | null,
  pos?: CaretPosition
): void {
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

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
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
      <>
        <div className="text-left text-[15px] mb-1.5 px-2.5 pb-0.5">
          Choose a password
          <span className="float-right mt-0.5 mx-1.5 mb-2.5">
            {pswd.length}
          </span>
        </div>
        <textarea
          id="pswdbox"
          className={cn(
            "box-border text-left bg-white border-2 border-[#0A0F0D] text-[22px]",
            "p-3 px-4 mt-1.5 mb-5 w-full overflow-y-hidden resize-none",
            "shadow-[8px_8px_1px_0px_rgba(209,197,209,0.5)]",
            "hover:shadow-[10px_10px_1px_0px_rgba(209,197,209,0.6)]",
            "focus:border-2 focus:border-[#533ea5] focus:outline-none",
            "transition-shadow"
          )}
          ref={textareaRef}
          value={pswd}
          onChange={handleChange}
          rows={1}
          spellCheck={false}
        />
      </>
    );
  }
);

PasswordBox.displayName = "PasswordBox";

export default PasswordBox;
