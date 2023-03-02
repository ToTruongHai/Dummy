import { useEffect } from "react";
import i18n from "i18n";
import ClientCache from "services/clientCache";

const useTranlateWhenLocaleChange = () => {
  const defaultLocale = ClientCache.getI18NextLocale();
  const locale = ClientCache.getLocaleWithCookies(defaultLocale);

  useEffect(() => {
    i18n.changeLanguage(locale, async () => {
      const _locale = ClientCache.getLocaleWithCookies();
      return i18n.changeLanguage(_locale);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale, defaultLocale]);
};

export default useTranlateWhenLocaleChange;
