import useDragDrop from "hooks/useDragDrop";
import { isEmpty } from "lodash-es";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { filterDuplicate } from "../../../utils/helpers";

type Props = {
  rows: [];
  columns?: [];
  draggable?: boolean;
  classList?: any;
  cols?: any;
  dragOver?: any;
  handleDragRows: (newRows: any) => {} | void;
  handleChecked: ({ item, currentSelectedID, type, checked }: any) => {} | void;
  selectable: boolean;
  setChkbox: any;
  chkbox: any;
  checkBoxDataRef: any;
};

const Row = ({
  rows,
  draggable,
  classList,
  cols,
  dragOver,
  handleDragRows = () => {},
  selectable,
  handleChecked,
  setChkbox,
  chkbox,
  checkBoxDataRef,
}: Props) => {
  const { dragDropContainerRef, dragDropAttribute, closestId } =
    useDragDrop({
      hoverStyle: classList.over,
      behavior: "INSERTBEFORE",
      selectable: selectable,
      callBack: (oldIndex: any, newIndex: any) => {
        const newRows = [...rows];
        const item = newRows?.[oldIndex];
        newRows?.splice(oldIndex, 1);
        newRows?.splice(newIndex, 0, item);
        handleDragRows(newRows);
      },
    }) ?? {};

  const handleRenderTD = useCallback(
    (columnData: any) =>
      cols?.map((item: any, index: any) => {
        const isHaveRender =
          !isEmpty(item?.render) || typeof item?.render === "function";
        const { dataIndex } = item ?? {};
        const _columnData = columnData?.[dataIndex] ?? [];

        return isHaveRender ? (
          <td key={index}>{item?.render(_columnData, columnData)}</td>
        ) : (
          <td key={index} drag-over={cols[index] === dragOver}>
            {_columnData}
          </td>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cols]
  );

  const processingSelectData = (item: any, index: any) => (e: any) => {
    const isChecked = e.target.checked;
    const checkboxData = checkBoxDataRef.current ?? [];

    if (isChecked) {
      checkBoxDataRef.current = filterDuplicate([...checkboxData, item] as any);
      setChkbox((prevState: any) => [...prevState, item.key]);
      return handleChecked({
        type: "normal",
        item: checkBoxDataRef.current,
        currentSelectedID: item.key,
        checked: isChecked,
      });
    }

    checkBoxDataRef.current.forEach((e: any, index: any) => {
      if (e.key === item.key) return checkBoxDataRef.current.splice(index, 1);
    });

    const _checkbox = chkbox.map((e: any, index: any) => {
      if (e === item.key) return chkbox.splice(index, 1);
    });
    setChkbox(_checkbox);

    return handleChecked({
      type: "normal",
      item: checkBoxDataRef.current,
      currentSelectedID: item.key,
      checked: isChecked,
    });
  };

  const handleRenderColumns = useMemo(() => {
    if (isEmpty(rows)) return;
    return rows?.map((item: any, index: any) => {
      const isChecked = chkbox?.includes(item?.key);
      return (
        <tr
          key={index}
          className="border border-gray-200"
          id={closestId} // @@@ need this for drag @@@
          {...dragDropAttribute} // @@@ need this for drag @@@
        >
          {draggable && (
            <td
              draggable={draggable} // @@@ need this for drag @@@
              key={index + 999}
              className="text-center cursor-move"
            >
              |||
            </td>
          )}
          {selectable && (
            <td key={index + 1000}>
              <input
                type="checkbox"
                onChange={processingSelectData(item, index)}
                checked={isChecked}
              />
            </td>
          )}
          {handleRenderTD(item)}
        </tr>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols, chkbox]);

  return (
    <tbody
      ref={dragDropContainerRef} // @@@ need this for drag @@@
    >
      {handleRenderColumns}
    </tbody>
  );
};

export default Row;
