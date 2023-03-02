import { useRouter } from "next/router";
import React, { useRef } from "react";
import { authUrlService, serviceStatus } from "services/constants";
import { FetchAPI } from "services/FetchService";
import styles from "./CreateUserPage.module.css";

type Props = {};

const CreateUserPage = (props: Props) => {
  const userDataRef = useRef({});
  const router = useRouter();

  const handleChangeInput = (e: any) => {
    const { value, name } = e.target ?? {};
    const current = userDataRef.current as {};
    userDataRef.current = {
      ...current,
      [name]: value,
    };
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = userDataRef.current as {};

    FetchAPI(
      { url: authUrlService?.registerServiceURL, input: data, method: "POST" },
      async (res, status) => {
        if (status === serviceStatus?.ERROR) return alert("create fail");
        alert("success");
        return router.push("/login");
      }
    ).catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <div className={styles.container}>
      LoginPage
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="username"
          onChange={handleChangeInput}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChangeInput}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChangeInput}
        />
        <input
          type="text"
          name="age"
          placeholder="age"
          onChange={handleChangeInput}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default CreateUserPage;
