import React from "react";
import { cn } from "@/lib/utils";

interface RuleBoxProps {
  heading: string;
  msg: string;
  correct: boolean;
  renderItem?: (props: any) => React.ReactNode
  propsToChild?: any
}

function RuleBox({
  heading,
  msg,
  correct,
  renderItem,
  propsToChild,
}: RuleBoxProps) {
  return (
    <div
      className={cn(
        "rounded-none text-left text-base my-[22px] mx-auto overflow-hidden",
        "border-2 transition-all duration-500",
        "shadow-[8px_8px_1px_0px_rgba(222,184,189,0.4)]",
        "hover:shadow-[10px_10px_1px_0px_rgba(222,184,189,0.5)]",
        correct
          ? "bg-[#deffce] border-[#52A22A] shadow-[8px_8px_1px_0px_rgba(167,187,157,0.4)] hover:shadow-[10px_10px_1px_0px_rgba(167,187,157,0.5)]"
          : "bg-[#ffeced] border-[#CE273D]"
      )}
    >
      <div
        className={cn(
          "py-1.5 px-4 pr-4 pb-2 pl-2 font-bold text-[15px]",
          "transition-all duration-500",
          correct
            ? "bg-[#b4ea99] text-[#32621a]"
            : "bg-[#fabac4] text-[#a11a2c]"
        )}
      >
        {correct ? "✅" : "❌"} {heading}
      </div>
      <div className="py-[11px] px-[17px] pr-[17px] pb-[15px] pl-[11px]">
        {msg}
        {renderItem !== undefined ? renderItem(propsToChild) : null}
      </div>
    </div>
  );
}

export default RuleBox;
