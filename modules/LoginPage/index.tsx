import { isEmpty } from "lodash-es";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import ClientCache from "services/clientCache";
import { authUrlService, serviceStatus } from "services/constants";
import { FetchAPI } from "services/FetchService";
import { getRedirectPathFromRouter } from "utils/helpers";

type Props = {};

const LoginPage = (props: Props) => {
  const formData = useRef({});
  const router = useRouter();
  const redirectPath = getRedirectPathFromRouter(router);
  const isHaveRedirectPath = !isEmpty(redirectPath);

  const handleChangeInput = (e: any) => {
    const { value, name } = e.target ?? {};
    formData.current = {
      ...formData.current,
      [name]: value,
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = formData.current;

    return await FetchAPI(
      { url: authUrlService?.loginServiceURL, input: data, method: "POST" },
      (res, status) => {
        if (status === serviceStatus?.ERROR) return;

        ClientCache.setAuthenTokenWithCookie(res);

        if (isHaveRedirectPath)
          return router.push({
            pathname: redirectPath,
          });
        return router.push({
          pathname: "/profile",
        });
      }
    ).catch((error) => {
      ClientCache.removeAuthenTokenWithCookie();
      console.error("Error:", error);
    });
  };

  useEffect(() => {
    const token = ClientCache.getAuthenticationWithCookie();
    if (token === null) return () => {};
    const { id_token } = token ?? {};

    router.push(
      {
        pathname: "/profile",
        query: { token: id_token?.token },
      },
      "/profile"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      LoginPage:
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="username"
          onChange={handleChangeInput}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChangeInput}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
