import { renderToStaticMarkup } from "react-dom/server";
import { IconType } from "react-icons";

export const iconToString = (Icon: IconType) =>
   `data:image/svg+xml;utf-8,${encodeURIComponent(
      renderToStaticMarkup(<Icon />),
   )}`;
