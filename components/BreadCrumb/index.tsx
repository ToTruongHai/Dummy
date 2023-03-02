import { isEmpty } from "lodash-es";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { productUrlService } from "services/constants";
import { FetchAPI } from "services/FetchService";
import { getProperName } from "./constants";

const SVGPATH = () => (
  <svg
    aria-hidden="true"
    className="w-6 h-6 text-gray-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const SVGHOME = () => (
  <svg
    aria-hidden="true"
    className="w-4 h-4 mr-2"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
  </svg>
);

type Props = {
  pageName?: String;
};

const BreadCrumb = ({ pageName }: Props) => {
  const { push } = useRouter() ?? {};
  const handleRouterChange = (item: any) =>
    push({
      pathname: item?.href,
    });

  const [data, setData] = useState<any>([]);
  const { pathname, asPath } = useRouter() ?? {};

  const handleCallAPI = async (id: any) => {
    const _input = {
      id: [+id],
    };
    return await FetchAPI({
      url: productUrlService?.findServiceURL,
      method: "POST",
      input: _input,
    });
  };

  const getPathNameArrayWithoutQuery = (type: any) => {
    const asPathWithoutQuery = type.split("?")?.[0] ?? [];
    return asPathWithoutQuery.split("/").filter((v: any) => v.length > 0) ?? [];
  };

  const ref = useRef([] as any);

  const breadcrumbs = async () => {
    const _pathName = getPathNameArrayWithoutQuery(pathname);
    const _asPath = getPathNameArrayWithoutQuery(asPath);

    const crumblist = _pathName.map(async (subpath: any, idx: any) => {
      const href = "/" + _pathName.slice(0, idx + 1).join("/");
      const getBreadCrumbName = getProperName(subpath) ?? "";

      if (
        subpath?.includes("[") &&
        !_asPath?.some((e: any) => e.includes("["))
      ) {
        const res = await handleCallAPI(_asPath?.[idx]);
        const _href = "/" + _asPath.slice(0, idx + 1).join("/");
        return { pageName, href: _href, text: res?.[0]?.name };
      }

      return { currentPage: pageName, href, text: getBreadCrumbName };
    });
    const _crumblist = await crumblist;

    return (ref.current = [
      { currentPage: pageName, href: "/", text: "Home" },
      ..._crumblist,
    ]);
  };

  const fetchData = async () => {
    await breadcrumbs();

    const arr = ref.current?.map(async (item: any) => {
      return {
        ...(await item),
      };
    });

    Promise.all(arr).then((item) => {
      setData(item);
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageName, ref.current]);

  const renderBreadCrumbData = useMemo(() => {
    if (isEmpty(data)) return;
    return data?.map((item: any, index: any) => {
      const { text } = item ?? {};
      const isHome = text === "Home";

      return (
        <li key={index} className="inline-flex items-center">
          <a
            href="#"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-lime"
            onClick={() => handleRouterChange(item)}
          >
            {isHome ? <SVGHOME /> : <SVGPATH />}
            {text}
          </a>
        </li>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, asPath]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {renderBreadCrumbData}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
