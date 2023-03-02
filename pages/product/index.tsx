import { DefaultLayout, LayoutWithBreadCrumb } from "layouts";
import ProductPage from "modules/ProductPage";
import type { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout = () => {
  return <ProductPage />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return (
    <LayoutWithBreadCrumb pageName={pageName}>{page}</LayoutWithBreadCrumb>
  );
};

Page.pageName = "productPage";

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Page;
