import React, { ReactElement } from "react";

type Props = {
  children?: ReactElement;
  pageName?: String;
};

const ErrorLayout = ({ children, pageName }: Props) => {
  return <div>{children}</div>;
};

export default ErrorLayout;
