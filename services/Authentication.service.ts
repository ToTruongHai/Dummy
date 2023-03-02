import { authUrlService } from "./constants";

export const getUserProfile = async (Token: string) => {
  const response = await fetch(authUrlService?.profileServiceURL, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response.json();
};
