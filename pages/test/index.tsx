import { DefaultLayout } from "layouts";
import TestPage from "modules/TestPage";
import { NextPageWithLayout } from "pages/_app";
import type { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return <TestPage />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return <DefaultLayout pageName={pageName}>{page}</DefaultLayout>;
};

Page.pageName = "testPage";

export default Page;
