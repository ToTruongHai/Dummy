/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  className?: string;
  imgSrc?: string;
  imgAlt?: string;
  title?: string;
  description?: string;
  price?: string;
  brand?: string;
  category?: string;
  onClick?: () => void;
};

const style = {
  width: "100%",
  height: "200px",
};

const ViewBox = ({
  className,
  imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCtW2p14G0n6nVKp1hK8znOV8zP82uDxLAMgqhjr20s2k-_E6WFVYnkFSlszER9uITLCo&usqp=CAU",
  imgAlt,
  title,
  description,
  price,
  brand,
  category,
  onClick,
}: Props) => {
  return (
    <div className="w-full p-20">
      <div
        onClick={onClick}
        className={` rounded overflow-hidden shadow-lg ${className} cursor-pointer`}
      >
        <img style={style} src={imgSrc} alt={imgAlt} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <h5>{brand}</h5>
          <p className="text-gray-700 text-base">{description}</p>
          <span>Price: {price}</span>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewBox;
