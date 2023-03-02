import { isEmpty } from "lodash-es";
import React, { useContext, useEffect } from "react";
import { globalContextType, userType } from "../../context/@types.global";
import { GlobalContext } from "../../context/GlobalContext";

type Props = {
  users: userType[];
};

const HomePage = (props: Props) => {
  const { users } = useContext(GlobalContext) as globalContextType;

  useEffect(() => {
    if (isEmpty(users)) return;

    // do something here if user not login
  }, [users]);

  return (
    <div>
      <h3>All user:</h3>
    </div>
  );
};

export default HomePage;
