import { FIELD_TYPE } from "components/constants";
import FileUpload from "components/FileUpload";
import Form from "components/Form";
import FormItem from "components/FormItem";
import Input from "components/Input";
import Modal from "components/Modal";
import Select from "components/Select";
import useRefForm from "hooks/useRefForm";
import { isEmpty } from "lodash-es";
import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { unstable_batchedUpdates } from "react-dom";
import { useTranslation } from "react-i18next";
import { categoryUrlService, productUrlService } from "services/constants";
import { FetchAPI } from "services/FetchService";
import { IMAGE_TYPE } from "utils/constants";
import { convertByteToMegaByte, getBase64 } from "utils/helpers";
import { modalFormData } from "./constants";
import ProductList from "./ProductList";
import useServiceSWR from "hooks/useServiceSWR";

type Category = {
  id: number;
  name: string;
};

const ProductPage = () => {
  const { t } = useTranslation();
  const form = useRefForm();
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [selectCategory, setSelectCategory] = useState<Category[]>();
  const [productList, setProductList] = useState<[]>();
  const [fileImage, setFileImage] = useState<any>();
  // const { data, isLoading } = useServiceSWR({
  //   url: productUrlService?.getAllServiceURL,
  // });
  const defaultValue = {
    productBrand: "",
    productCategory: 1,
    productDescription: "",
    productImage: "",
    productName: "",
    productPrice: "",
  };

  const createProductAPI = async (input: any) => {
    try {
      return await FetchAPI({
        url: productUrlService?.createServiceURL,
        input,
        method: "POST",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseModal = () => setIsActiveModal(false);
  const handleConfirmModal = () => {
    const {
      productBrand,
      productCategory,
      productDescription,
      productName,
      productPrice,
    } = form?.getFieldsValue(true) ?? ({} as any);

    form?.validating(() => {
      if (isEmpty(fileImage)) return alert("upload hinh");
      const input = {
        name: productName,
        brand: productBrand,
        image: fileImage,
        desc: productDescription,
        price: productPrice,
        category: productCategory,
      };

      createProductAPI(input);
      return setIsActiveModal(false);
    });
  };

  const fetchData = async () => {
    const resCategory = FetchAPI({
      url: categoryUrlService?.getAllServiceURL,
      input: {},
      method: "GET",
    });

    const resProduct = FetchAPI({
      url: productUrlService?.getAllServiceURL,
      input: {},
      method: "GET",
    });

    const _resCategory = await resCategory;
    const _resProduct = await resProduct;

    return unstable_batchedUpdates(() => {
      setSelectCategory(_resCategory);
      setProductList(_resProduct);
    });
  };

  useEffect(() => {
    if (!isEmpty(productList)) return;
    if (!isEmpty(selectCategory)) return;
    fetchData();
  }, [productList, selectCategory]);

  const renderModalFormField = () =>
    modalFormData(t)?.map((item, index) => {
      const handleFormItem = {
        // TYPE INPUT
        [FIELD_TYPE?.INPUT]: (data: any) => {
          return (
            <FormItem
              label={data?.label}
              name={data?.name}
              rules={[data?.rules]}
              key={index}
            >
              <Input type={data?.valueType} placeholder={data?.placeholder} />
            </FormItem>
          );
        },
        // TYPE SELECT
        [FIELD_TYPE?.SELECT]: (data: any) => {
          return (
            <FormItem
              name={data?.name}
              label={data?.label}
              rules={[data?.rules]}
              key={index}
            >
              <Select.Default data={selectCategory} />
            </FormItem>
          );
        },
        // TYPE FILE
        [FIELD_TYPE?.FILE]: () => {
          const handleFileUpload = async (e: any) => {
            const { files } = e.target ?? {};
            const file = files[0] ?? {};
            const type = file.type;
            if (!IMAGE_TYPE?.includes(type)) return alert("sai dinh dang");

            if (convertByteToMegaByte(file?.size) < 2) {
              const base64 = await getBase64(file);
              return setFileImage(base64);
            }
            return alert("file too large");
          };

          return (
            <FormItem key={index}>
              <FileUpload
                fileImage={fileImage}
                onChange={(e: any) => handleFileUpload(e)}
              />
            </FormItem>
          );
        },
      };

      return (
        <React.Fragment key={index}>
          {handleFormItem?.[item?.type]?.(item)}
        </React.Fragment>
      );
    });

  const handleFormDataChange = (e: any) => {
    const { value, name } = e.target ?? {};

    return form.setFieldsValue({
      [name]: value,
    });
  };

  const handleRenderModalContent = () => {
    return (
      <div>
        <Form
          defaultValue={defaultValue}
          form={form}
          onChange={handleFormDataChange}
          className="w-full"
        >
          <div className="w-full flex flex-wrap mb-6">
            {renderModalFormField()}
          </div>
        </Form>
      </div>
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderProductList = useMemo(() => {
    if (isEmpty(productList)) return;

    const _productList = productList?.map((e: any) => {
      return {
        ...e,
        category: e?.category?.name,
      };
    });
    return <ProductList productList={_productList as []} />;
  }, [productList]);

  return (
    <div>
      Product
      <br />
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setIsActiveModal(true)}
      >
        Create Product Modal
      </button>
      {isActiveModal && (
        <Modal
          modalTitle="Create Product"
          onCancel={handleCloseModal}
          onConfirm={handleConfirmModal}
          modalContent={handleRenderModalContent()}
        />
      )}
      <>{renderProductList}</>
    </div>
  );
};

export default ProductPage;
