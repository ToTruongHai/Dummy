import { isEmpty } from "lodash-es";
import React, { useMemo } from "react";
type Props = {
  data?: [] | any;
  draggable?: boolean;
};
const TableHeader = ({ data, draggable }: Props) => {
  const handleRenderHeader = useMemo(() => {
    if (isEmpty(data)) return;

    return data?.map((item: any, index: any) => (
      <th key={index}>{item?.title}</th>
    ));
  }, [data]);

  return (
    <thead className="text-left bg-gray-100">
      <tr>
        {draggable && <th className="text-center p-3">#</th>}
        {handleRenderHeader}
      </tr>
    </thead>
  );
};

export default TableHeader;
