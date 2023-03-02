import type { ReactElement } from "react";
import { DefaultLayout } from "../layouts";
import HomePage from "../modules/HomePage";
import type { NextPageWithLayout } from "./_app";
import "i18n";

const Page: NextPageWithLayout = ({ users }: any) => {
  return <HomePage users={users} />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return <DefaultLayout pageName={pageName}>{page}</DefaultLayout>;
};

export async function getStaticProps() {
  // const allUserData = getAllUser("http://localhost:3333/user/all");
  // const userProfile = getUserProfile()

  // const res = await allUserData;

  return {
    props: {
      // users: res
    },
  };
}

Page.pageName = "homePage";

export default Page;
