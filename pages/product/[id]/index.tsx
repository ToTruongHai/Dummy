import { DefaultLayout, LayoutWithBreadCrumb } from "layouts";
import ProductDetailPage from "modules/ProductDetailPage";
import { NextPageWithLayout } from "pages/_app";
import type { ReactElement } from "react";

const Page: NextPageWithLayout = () => {
  return <ProductDetailPage />;
};

Page.getLayout = function getLayout(page: ReactElement, pageName: String) {
  return (
    <LayoutWithBreadCrumb pageName={pageName}>{page}</LayoutWithBreadCrumb>
  );
};

Page.pageName = "productDetailPage";

export default Page;
