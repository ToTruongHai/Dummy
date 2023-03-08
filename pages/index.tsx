import HomePage from "@/modules/HomePage";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import dynamic from "next/dynamic";
import { DefaultLayout } from "@/layouts";


const Page: NextPageWithLayout = () => {
  return <HomePage />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return <DefaultLayout pageName={pageName}>{page}</DefaultLayout>;
};

Page.pageName = "homePage";

export default Page;
