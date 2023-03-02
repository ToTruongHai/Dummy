import Cookies from "js-cookie";
import { isEmpty } from "lodash-es";

type token = {
  access_token: string;
};

class ClientCache {
  public static AUTHORIZATION: string = "Authorization";
  public static TOKEN: string = "Token";
  public static TOKEN_EXPIRE_DATE: string = "TokenExpireTime";
  public static LOCALE_LANGUAGE: string = "locale";

  constructor() {}

  public static setAuthenTokenWithCookie = (tokenData: token) => {
    if (typeof window === "undefined") return;
    const { access_token } = tokenData ?? {};

    const oneDay = 48 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate: any = new Date();
    const secondDate: any = 0; // new Date(_refreshTokenExpiredTime);

    const expiredDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    const CookiesPlus = Cookies.withConverter({
      write: (value) => {
        return value;
      },
    });

    CookiesPlus.set(this.AUTHORIZATION, `Bearer ${access_token}`, {
      path: "/",
      expires: expiredDays,
    });
    Cookies.set(this.TOKEN, access_token, { path: "/", expires: expiredDays });
    Cookies.set(this.TOKEN_EXPIRE_DATE, expiredDays.toString());
  };

  public static getAuthenticationWithCookie = () => {
    if (typeof window === "undefined") return;

    const token = Cookies.get(this.TOKEN) ?? "";
    const token_expire_date = Cookies.get(this.TOKEN_EXPIRE_DATE) ?? "";

    if (isEmpty(token)) return null;
    if (isEmpty(token_expire_date)) return this.removeAuthenTokenWithCookie();

    return {
      id_token: {
        token,
        expired_time: JSON.parse(token_expire_date),
      },
    } as any;
  };

  // deleteCookie(cname) {
  //   document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // }

  public static setLocaleWithCookies(locale: any) {
    if (locale === Cookies.get(this.LOCALE_LANGUAGE)) return;
    // const domainConfig = {
    //   path: '/',
    //   domain: config.COOKIE_DOMAIN,
    //   ...(config.IS_LOCAL && {
    //     domain: config.LOCALHOST_DOMAIN
    //   })
    // };

    Cookies.set(this.LOCALE_LANGUAGE, locale, {
      path: "/",
      // ...domainConfig
    });
  }

  public static getI18NextLocale() {
    if (typeof window === "undefined") return;
    return Cookies.get("i18next");
  }

  public static getLocaleWithCookies(defaultLocale = "") {
    if (typeof window === "undefined") return;
    const locale = Cookies.get(this.LOCALE_LANGUAGE) ?? defaultLocale;
    return locale;
  }

  public static removeAuthenTokenWithCookie() {
    if (typeof window === "undefined") return;

    // Remove current domain
    Cookies.remove(this.TOKEN);
    Cookies.remove(this.AUTHORIZATION);
    Cookies.remove(this.TOKEN_EXPIRE_DATE);
  }
}

export default ClientCache;
