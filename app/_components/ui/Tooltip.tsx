import { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface TooltipProps {
   text: string;
   children: React.ReactNode;
   id: string;
   hidden?: boolean;
   wrapperClassName?: string;
}

export const Tooltip = ({
   children,
   text,
   id,
   hidden,
   wrapperClassName,
}: TooltipProps) => {
   return (
      <>
         <span
            data-tip
            data-tooltip-id={id}
            className={wrapperClassName || ""}
         >
            {children}
         </span>
         <ReactTooltip
            style={{
               backgroundColor: "#043427",
               color: "azure",
               padding: "0.35rem 0.75rem",
               fontWeight: 400,
               borderRadius: "0.45rem",
               fontSize: "0.8rem",
               height: "auto",
               maxWidth: "16rem",
            }}
            id={id}
            hidden={hidden}
         >
            {text}
         </ReactTooltip>
      </>
   );
};
