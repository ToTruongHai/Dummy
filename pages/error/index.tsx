import type { ReactElement } from "react";
import { ErrorLayout } from "../../layouts";
import ErrorPage from "../../modules/ErrorPage";
import type { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  return <ErrorPage />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return <ErrorLayout pageName={pageName}>{page}</ErrorLayout>;
};

Page.pageName = "errorPage";

export default Page;
