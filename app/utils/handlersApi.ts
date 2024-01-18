import { urls } from "./urls";

const { rootPath } = urls();

export const getServerData = async <T>(url: string): Promise<T> => {
   const res = await fetch(`${rootPath}/api/${url}`);
   const resJson = await res?.json();
   return resJson;
};

export const postServerData = async <T extends NextResponseBasic>(url: string, data: object): Promise<T> => {
   const res = await fetch(`${rootPath}/api/${url}`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
   });
   const resJson = await res?.json();
   return resJson;
};
