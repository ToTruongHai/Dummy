import { isEmpty } from "lodash-es";

export const navMenuData = ({users = {} as any, t = (translate: string) => {}, ClientCache, setUser}: any) => [
    {
      label: t("DEFAULT_LAYOUT.HEADER.HOME"),
      name: "homePage",
      path: "/",
    },

    ...(isEmpty(users)
      ? [
          {
            label: t("DEFAULT_LAYOUT.HEADER.REGISTER"),
            name: "createUserPage",
            path: "/createuser",
          },
          {
            label: t("DEFAULT_LAYOUT.HEADER.LOGIN"),
            name: "loginPage",
            path: "/login",
          },
          {
            label: "TEST COMPONENTS",
            name: "test",
            path: "/test",
          }
        ]
      : [
          {
            label: t("DEFAULT_LAYOUT.HEADER.PRODUCT"),
            name: "productPage",
            path: "/product",
          },
          {
            label: t("DEFAULT_LAYOUT.HEADER.PROFILE"),
            name: "profilePage",
            path: "/profile",
          },
          {
            label: t("DEFAULT_LAYOUT.HEADER.LOGOUT"),
            name: "logout",
            path: "/",
            clickBehavior: () => {
              ClientCache.removeAuthenTokenWithCookie();
              return setUser?.(undefined);
            },
          },
        ]),
  ];