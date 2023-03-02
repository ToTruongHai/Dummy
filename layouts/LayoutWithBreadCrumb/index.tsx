import BreadCrumb from "components/BreadCrumb";
import useGetUserProfile from "hooks/useGetUserProfile";
import Empty from "layouts/components/Empty";
import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import dynamic from "next/dynamic";

import { ReactNode, useMemo } from "react";

import styles from "./LayoutWithBreadCrumb.module.css";

type Props = {
  children?: ReactNode;
  pageName?: String;
};

const LayoutWithBreadCrumb = ({ children, pageName }: Props) => {
  const { isHaveUser, users, setUser, isAllowPage } = useGetUserProfile();
  const renderChildren = useMemo(() => {
    return (
      <div>
        <Header users={users} setUser={setUser} />
        <BreadCrumb pageName={pageName} />
        <main className={styles.container}>{children}</main>
        <Footer />
      </div>
    );
  }, [users, setUser, pageName, children]);

  if (isAllowPage || isHaveUser) return renderChildren;

  return <Empty />;
};

export default dynamic(() => Promise.resolve(LayoutWithBreadCrumb), {
  ssr: false,
});
