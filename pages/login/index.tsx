import LoginPage from "modules/LoginPage";
import type { ReactElement } from "react";
import { DefaultLayout } from "../../layouts";
import type { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  return <LoginPage />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return <DefaultLayout pageName={pageName}>{page}</DefaultLayout>;
};

Page.pageName = "loginPage";

export default Page;
