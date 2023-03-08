import { FIELD_TYPE, INPUT_TYPE } from "components/constants";

/* SAU NÀY NÊN ĐỔI RULE VALIDATION 
      + MIN,MAX THÀNH LENGTH
      + FROM,TO THÀNH RANGE
*/

export type ModalData = {
  map(arg0: (item: any, index: any) => JSX.Element): unknown;
  name?: string;
  type?: string;
  valueType?: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  rules?: {
    required?: {
      value?: boolean;
      message?: string;
    };
    min?: {
      value?: number | boolean;
      message?: string;
    };
    max?: {
      value?: string | number | boolean;
      message?: string;
    };
    from?: {
      value?: string | number | boolean;
      message?: string;
    };
    to?: {
      value?: string | number | boolean;
      message?: string;
    };
  };
};

export const modalFormData = (t: any) => [
  {
    name: "productName",
    type: FIELD_TYPE?.INPUT,
    valueType: INPUT_TYPE?.TEXT,
    label: t("PRODUCT_MODULE.CREATE_MODAL.NAME.PRODUCT"),
    placeholder: t("PRODUCT_MODULE.CREATE_MODAL.PLACE_HOLDER.PRODUCT"),
    defaultValue: null,
    rules: {
      required: {
        value: true,
        message: "Ten san pham khong duoc de trong",
      },
      min: {
        value: 5,
        message: "toi thieu 5 ky tu",
      },
      max: {
        value: 10,
        message: "toi da 10 ky tu",
      },
    },
  },
  {
    name: "productImage",
    type: FIELD_TYPE?.FILE,
    valueType: null,
    label: t("PRODUCT_MODULE.CREATE_MODAL.NAME.IMAGE"),
    placeholder: null,
    defaultValue: null,
    rules: {
      required: {
        value: true,
        message: "Chua co validation cho type file",
      },
    },
  },
  {
    name: "productCategory",
    type: FIELD_TYPE?.SELECT,
    valueType: null,
    label: t("PRODUCT_MODULE.CREATE_MODAL.NAME.CATEGORY"),
    placeholder: null,
    defaultValue: 0,
    rules: {
      required: {
        value: true,
        message: "Chua co validation cho type select",
      },
    },
  },
  {
    name: "productBrand",
    type: FIELD_TYPE?.INPUT,
    valueType: INPUT_TYPE?.TEXT,
    label: t("PRODUCT_MODULE.CREATE_MODAL.NAME.BRAND"),
    placeholder: t("PRODUCT_MODULE.CREATE_MODAL.PLACE_HOLDER.BRAND"),
    defaultValue: null,
    rules: {
      required: {
        value: true,
        message: "Hang~ khong duoc de trong",
      },
      min: {
        value: 5,
        message: "toi thieu 5 ky tu",
      },
      max: {
        value: 20,
        message: "toi da 20 ky tu",
      },
    },
  },
  {
    name: "productDescription",
    type: FIELD_TYPE?.INPUT,
    valueType: INPUT_TYPE?.TEXT,
    label: t("PRODUCT_MODULE.CREATE_MODAL.NAME.DESCRIPTION"),
    placeholder: t("PRODUCT_MODULE.CREATE_MODAL.PLACE_HOLDER.DESCRIPTION"),
    defaultValue: null,
    rules: {
      required: {
        value: true,
        message: "Chi tiet khong duoc de trong",
      },
      min: {
        value: 10,
        message: "toi thieu 10 ky tu",
      },
      max: {
        value: 250,
        message: "toi da 250 ky tu",
      },
    },
  },
  {
    name: "productPrice",
    type: FIELD_TYPE?.INPUT,
    valueType: INPUT_TYPE?.NUMBER,
    label: t("PRODUCT_MODULE.CREATE_MODAL.NAME.PRICE"),
    placeholder: t("PRODUCT_MODULE.CREATE_MODAL.PLACE_HOLDER.PRICE"),
    defaultValue: null,
    rules: {
      required: {
        value: true,
        message: "Gia khong duoc de trong",
      },
      from: {
        value: 1000,
        message: "Toi thieu 1000 dong",
      },
      to: {
        value: 50000,
        message: "Toi da 50000 dong",
      },
    },
  },
];
