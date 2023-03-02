import { DefaultLayout } from "layouts";
import ProfilePage from "modules/ProfilePage";
import { NextPageWithLayout } from "pages/_app";
import type { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return <ProfilePage />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return <DefaultLayout pageName={pageName}>{page}</DefaultLayout>;
};

Page.pageName = "profilePage";

export default Page;
