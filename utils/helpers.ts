import { FILE_SIZE_TYPE } from "./constants";

export const isFunction = (func: any) =>
  Object.prototype.toString.call(func).indexOf("Function") > -1;

export const getPageNameFromRouter = (router: any) =>
  router?.components?.[router?.pathname]?.Component?.pageName;

export const getRedirectPathFromRouter = (router: any) =>
  router?.query?.redirectPath;

export const getBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

export const convertByteToMegaByte = (size: any) =>
  Math.round((size / FILE_SIZE_TYPE.MEGA_BYTE) * 100) / 100;

export const filterDuplicate = (arr: []) =>
  arr.filter((item, i) => arr.indexOf(item) === i);

export const checkImageTypeURL = (text: any) => {
  const allowExtension = [
    "JPEG",
    "JPG",
    "PNG",
    "TIFF",
    "PSD",
    "WEBP",
    "PDF",
    "EPS",
    "AI",
    "INDD",
    "RAW",
  ];
  const imageExtension = text.split(".").pop().toUpperCase();
  const regex = /[^A-Z0-9+\/=]/;
  const base64Regex = new RegExp(regex);

  if (
    allowExtension?.includes(imageExtension) ||
    text.match(base64Regex) !== null
  )
    return true;
  return false;
};

export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const isArray = (value: any) => Array.isArray(value);
