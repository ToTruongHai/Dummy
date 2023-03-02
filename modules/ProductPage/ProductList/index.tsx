import ViewBox from "components/ViewBox";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { checkImageTypeURL } from "utils/helpers";

type Props = {
  productList?: [];
};

const defaultImage =
  "https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg";

const ProductList = ({ productList }: Props) => {
  const router = useRouter();

  const handleRedirect = (id: unknown) => {
    return router.push(`/product/${id}`);
  };

  const renderList = useMemo(() => {
    return productList?.map((e, i) => {
      const { image, brand, desc, name, price, category, id } = e ?? {};
      const isImage = checkImageTypeURL(image);

      return (
        <ViewBox
          key={i}
          className=""
          imgSrc={isImage ? image : defaultImage}
          brand={brand}
          description={desc}
          price={price}
          title={name}
          category={category}
          onClick={() => handleRedirect(id)}
        />
      );
    });
  }, [productList]);

  return (
    <div className="mt-20 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
      {renderList}
    </div>
  );
};

export default ProductList;
