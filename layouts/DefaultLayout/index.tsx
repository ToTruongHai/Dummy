import dynamic from "next/dynamic";
import { ReactNode, useMemo } from "react";

import styles from "./DefaultLayout.module.css";

type Props = {
  children?: ReactNode;
  pageName?: String;
};

const Header = dynamic(() => import("demoNextjs/DefaultHeader") , {
  ssr: false,
});
const Footer = dynamic(() => import("demoNextjs/DefaultFooter"), {
  ssr: false,
});

const DefaultLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  );
};

export default dynamic(() => Promise.resolve(DefaultLayout), {
  ssr: false,
});
