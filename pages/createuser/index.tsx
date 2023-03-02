import { DefaultLayout } from "layouts";
import CreateUserPage from "modules/CreateUserPage";
import { NextPageWithLayout } from "pages/_app";
import type { ReactElement } from "react";

const Page: NextPageWithLayout = (props) => {
  return <CreateUserPage {...props} />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return <DefaultLayout pageName={pageName}>{page}</DefaultLayout>;
};

Page.pageName = "createUserPage";

export default Page;
