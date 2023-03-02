import React from "react";

type SelectData = { name?: string; selected?: boolean };

type Props = {
  data?: SelectData[];
  onChange?: (e: any) => void;
  className?: string;
  defaultValue?: string;
};

const Locale = ({ data, onChange, className, defaultValue }: Props) => {
  const renderData = () => {
    return data?.map((item, index) => {
      return (
        <option key={index} value={item?.name}>
          {item?.name}
        </option>
      );
    });
  };

  return (
    <select
      onChange={onChange}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      defaultValue={defaultValue}
    >
      {renderData()}
    </select>
  );
};

export default Locale;
