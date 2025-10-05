import React from "react";
import { cn } from "@/lib/utils";

interface RuleBoxProps {
  heading: string;
  msg: string;
  correct: boolean;
  renderItem?: (props: any) => React.ReactNode;
  propsToChild?: any;
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
        "rounded-xl border-2 transition-all duration-300 shadow-md",
        "hover:shadow-lg",
        correct ? "bg-green-50 border-green-500" : "bg-red-50 border-red-500",
      )}
    >
      <div
        className={cn(
          "px-4 py-2 font-semibold text-sm flex items-center gap-2 rounded-t-xl",
          "transition-colors duration-300",
          correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700",
        )}
      >
        <span>{correct ? "✅" : "❌"}</span>
        {heading}
      </div>
      <div className="px-4 py-3 text-sm text-muted-foreground">
        <p className="mb-2">{msg}</p>
        {renderItem ? renderItem(propsToChild) : null}
      </div>
    </div>
  );
}

export default RuleBox;
