import ClientCache from "./clientCache";
import { serviceStatus } from "./constants";

type CallBackType = (res?: any, status?: any) => void | undefined | {};

export const FetchAPI = async (
  { url = "", input = {}, method = "GET", rest = {} },
  callBack?: CallBackType
) => {
  const token = await ClientCache.getAuthenticationWithCookie();
  const isHaveToken = token !== null;
  const isPOST = method === "POST";

  const response = await fetch(url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(isHaveToken && { Authorization: `Bearer ${token?.id_token?.token}` }),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    ...(isPOST && { body: JSON.stringify(input) }),

    ...rest,
  });

  if (typeof callBack === "function") {
    const _data = (await response.json()) as any;
    return callBack(_data, response?.status);
  }

  const data = await response.json();
  if (data?.statusCode === serviceStatus?.UNAUTHORIZED) return;
  return data;
};
