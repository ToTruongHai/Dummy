import { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { GlobalProvider } from "../context/GlobalContext";
import "nprogress/nprogress.css";
import dynamic from "next/dynamic";
import "./../styles/globals.css";
import "i18n";
import useTranlateWhenLocaleChange from "hooks/useTranslateWhenLocaleChange";
import useGetUserProfile from "hooks/useGetUserProfile";

const TopProgressBar = dynamic(
  () => {
    return import("components/TopProgressBar");
  },
  { ssr: false }
);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageName: String) => ReactNode;
  pageName: String;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({
  Component,
  pageProps,
  router,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const getPageName = Component.pageName ?? "";

  useTranlateWhenLocaleChange();

  return (
    <GlobalProvider>
      {getLayout(
        <>
          <TopProgressBar />
          <Component {...pageProps} pageName={getPageName} route={router} />
        </>,
        getPageName
      )}
    </GlobalProvider>
  );
}
