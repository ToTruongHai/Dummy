import useGetUserProfile from "hooks/useGetUserProfile";
import Empty from "layouts/components/Empty";
import Footer from "layouts/components/Footer";
import Header from "layouts/components/Header";
import dynamic from "next/dynamic";
import { ReactNode, useMemo } from "react";

import styles from "./DefaultLayout.module.css";

type Props = {
  children?: ReactNode;
  pageName?: String;
};

const DefaultLayout = ({ children }: Props) => {
  const { isHaveUser, users, setUser, isAllowPage } = useGetUserProfile();

  const renderChildren = useMemo(() => {
    return (
      <div>
        <Header users={isHaveUser ? users : undefined} setUser={setUser} />
        <main className={styles.container}>{children}</main>
        <Footer />
      </div>
    );
  }, [children, isHaveUser, users, setUser]);

  if (isAllowPage || isHaveUser) return renderChildren;

  return <Empty />;
};

export default dynamic(() => Promise.resolve(DefaultLayout), {
  ssr: false,
});
