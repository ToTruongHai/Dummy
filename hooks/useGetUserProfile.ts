import { globalContextType } from "context/@types.global";
import { GlobalContext } from "context/GlobalContext";
import { isEmpty } from "lodash-es";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { getUserProfile } from "services/Authentication.service";
import ClientCache from "services/clientCache";
import { serviceStatus } from "services/constants";
import { allowPage } from "utils/constants";
import { getPageNameFromRouter } from "utils/helpers";

const useGetUserProfile = () => {
  const router = useRouter();
  const { users = {} as any, setUser } = useContext(
    GlobalContext
  ) as globalContextType;
  const pageName = getPageNameFromRouter(router);
  const str: string = String(pageName);
  const isHaveUser =
    users?.statusCode !== serviceStatus?.UNAUTHORIZED && !isEmpty(users);

  useEffect(() => {
    const tokenCookie = ClientCache.getAuthenticationWithCookie();

    const page = allowPage;

    if (tokenCookie === null) {
      if (page.includes(str)) return;

      ClientCache.removeAuthenTokenWithCookie();
      router.push({
        pathname: "/login",
        query: {
          redirectPath: router?.route,
        },
      });
    }

    const { id_token } = tokenCookie ?? {};

    getUserProfile(id_token?.token)
      .then((data) => {
        if (!isHaveUser) return setUser(data);
        if (data?.name === users?.name) return;
        return setUser(undefined);
      })
      .catch((error) => {
        ClientCache.removeAuthenTokenWithCookie();
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName]);

  return { isHaveUser, users, setUser, isAllowPage: allowPage.includes(str) };
};

export default useGetUserProfile;
