import useDragDrop from "hooks/useDragDrop";
import { isEmpty } from "lodash-es";
import React, { useMemo } from "react";

type Props = {
  data?: [];
  columns?: [];
  draggable?: boolean;
  classList?: any;
};

const Column = ({ data, columns, draggable, classList }: Props) => {
  const { dragDropContainerRef, dragDropAttribute, closestId } =
    useDragDrop({ hoverStyle: classList.over }) ?? {};

  const handleRenderTD = (columnData: any) => {
    return columns?.map((item: any, index: any) => {
      const isHaveRender =
        !isEmpty(item?.render) || typeof item?.render === "function";
      const { dataIndex } = item ?? {};
      const _columnData = columnData?.[dataIndex] ?? [];

      return isHaveRender ? (
        <td key={index}>{item?.render(_columnData, columnData)}</td>
      ) : (
        <td key={index}>{_columnData}</td>
      );
    });
  };

  const handleRenderColumns = useMemo(() => {
    if (isEmpty(data)) return;
    return data?.map((item: any, index: any) => {
      return (
        <tr
          key={index}
          className="border border-gray-200"
          id={closestId} // @@@ need this for drag @@@
          {...dragDropAttribute} // @@@ need this for drag @@@
        >
          <td
            draggable={draggable} // @@@ need this for drag @@@
            key="9999"
            className="text-center cursor-move"
          >
            |||
          </td>
          {handleRenderTD(item)}
        </tr>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <tbody
      ref={dragDropContainerRef} // @@@ need this for drag @@@
    >
      {handleRenderColumns}
    </tbody>
  );
};

export default Column;
