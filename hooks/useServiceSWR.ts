import { useMemo } from "react";
import ClientCache from "services/clientCache";
import useSWR from "swr";

type Props = {
  url?: string;
  input?: {};
  method?: "GET" | "POST" | "DELETE" | "PUT";
  rest?: {};
};

const fetcher = ({ url, headers }: any) =>
  fetch(url, headers).then((res) => res.json());

const useServiceSWR = ({
  url = "",
  input = {},
  method = "GET",
  rest = {},
}: Props) => {
  const token = ClientCache.getAuthenticationWithCookie();

  const isHaveToken = token !== null;
  const isPOST = method === "POST";
  const config = {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(isHaveToken && {
        Authorization: `Bearer ${token?.id_token?.token}`,
      }),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    ...(isPOST && { body: JSON.stringify(input) }),

    ...rest,
  };

  const { data, error, isLoading } = useSWR(url, (url) =>
    fetcher({ url, headers: config })
  );

  return {
    data,
    isLoading,
    isError: error,
  };
};

export default useServiceSWR;
