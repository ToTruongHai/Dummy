export const getProperName = (subpath: any) => {
  const handlePageName = {
    profile: () => "Profile",
    product: () => "Product",

    default: () => "Default",
  } as any;
  return handlePageName?.[subpath]?.() || handlePageName?.["default"]?.();
};
