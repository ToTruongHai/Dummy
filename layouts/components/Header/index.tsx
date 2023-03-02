import { LOCALE_DATA } from "components/constants";
import Select from "components/Select";
import { userType } from "context/@types.global";
import { isEmpty } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ClientCache from "services/clientCache";
import { getPageNameFromRouter } from "utils/helpers";
import styles from "./Header.module.css";

type Props = {
  users?: userType;
  setUser?: React.Dispatch<React.SetStateAction<userType | undefined>>;
};

type Menus = {
  label: string;
  name: string;
  path: string;
  clickBehavior?: () => {} | unknown;
};

type SelectData = { name?: string; selected?: boolean };

const Header = ({ users, setUser }: Props) => {
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = useState("homePage");
  const router = useRouter();
  const defaultLocale = ClientCache.getLocaleWithCookies();

  const navMenu: Menus[] = [
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

  const LocaleData: SelectData[] = [
    {
      name: LOCALE_DATA?.VI,
    },
    {
      name: LOCALE_DATA?.EN,
    },
  ];

  const handleMenuClick = (item: Menus) => () => {
    if (typeof item?.clickBehavior === "function") item?.clickBehavior?.();

    return setActiveMenu(item.path);
  };

  // reload page keep path
  useEffect(() => {
    if (isEmpty(router?.pathname)) return;
    const pageName = getPageNameFromRouter(router);

    setActiveMenu(pageName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.pathname]);

  const handleOnSelectChange = (e: any) => {
    const locale = e.target.value ?? "";

    ClientCache.setLocaleWithCookies(locale);

    return router.replace(router.asPath, router.asPath, {
      shallow: true,
    });
  };

  const renderHeaderData = () => {
    return navMenu?.map((item, index) => {
      const isActiveMenu = activeMenu === item?.name;
      return (
        <li
          key={index}
          className={`${item.name} ${isActiveMenu ? styles.active : ""}`}
        >
          <Link href={`${item?.path}`} onClick={handleMenuClick(item)}>
            {item?.label}
          </Link>
        </li>
      );
    });
  };

  return (
    <div className={styles.container}>
      <ul className={styles.menu}>{renderHeaderData()}</ul>
      <Select.Locale
        className={styles.locale}
        data={LocaleData}
        onChange={handleOnSelectChange}
        defaultValue={defaultLocale}
      />
    </div>
  );
};

export default Header;
