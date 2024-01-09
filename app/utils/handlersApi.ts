import { urls } from "./urls";

const {rootPath} = urls();

export const getServerData = async <T>(url: string): Promise<T> => {
   const res = await fetch(`${rootPath}/api/${url}`).catch(err => console.log(err));
   const resJson = await res?.json(); 
   return resJson;
};  

export const postServerData = async <T, U>(url: string, data: U): Promise<T> => {
   const res = await fetch(`${rootPath}/api/${url}`, {
      method: "POST",
      body: JSON.stringify(data), 
    })
    .catch(err => console.log("error", err));

    const resJson = await res?.json();
    return resJson;
}; 