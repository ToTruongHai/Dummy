import { Icon } from "@iconify-icon/react";
import { useRouter } from "next/router";
import React from "react";

const ProductDetailPage = () => {
  const router = useRouter();
  const id = router?.query?.id;

  return (
    <div>
      ProductDetailPage
      <Icon
        // icon={el?.icon}
        // color={el?.color}
        // className={el?.className}
        // onClick={el?.onClick}
        icon="material-symbols:video-call-outline-sharp"
      />
      {id}
    </div>
  );
};

export default ProductDetailPage;
