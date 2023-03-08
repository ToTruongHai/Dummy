import React, { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "./../styles/globals.css";

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

  return (
    <React.Fragment>
      {getLayout(
        <>
          <Component {...pageProps} pageName={getPageName} route={router} />
        </>,
        getPageName
      )}
    </React.Fragment>
  );
}
