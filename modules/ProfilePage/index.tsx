import { globalContextType } from "context/@types.global";
import { GlobalContext } from "context/GlobalContext";
import { useRouter } from "next/router";
import React, { useContext } from "react";

type Props = {};

const ProfilePage = (props: Props) => {
  const router = useRouter();
  const { users } = useContext(GlobalContext) as globalContextType;

  return (
    <div>
      <p>{users?.name}</p>
      <p>{users?.email}</p>
      <p>{users?.age}</p>
      <p>{users?.salary}</p>
    </div>
  );
};

export default ProfilePage;
