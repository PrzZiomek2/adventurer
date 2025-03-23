import serialize from "serialize-javascript";
import { urls } from "./urls";

const { rootPath } = urls();

export const getServerData = async <T>(url: string): Promise<T> => {
   const res = await fetch(`/api/${url}`);
   const resJson = await res?.json();
   return resJson;
};

export const postServerData = async <T extends NextResponseBasic>(
   url: string,
   data: unknown,
): Promise<T> => {
   const res = await fetch(`/api/${url}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: serialize(data, { isJSON: true }),
   });
   const resJson = await res?.json();
   return resJson;
};
