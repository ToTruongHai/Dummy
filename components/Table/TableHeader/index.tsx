import Input from "components/Input";
import { isEmpty } from "lodash-es";
import React, { useMemo } from "react";
type Props = {
  cols?: [] | any;
  draggable?: boolean;
  handleDragCols: (newCols: any) => {} | void;
  setDragOver?: any;
  dragOver?: any;
  classList?: any;
  selectable: boolean;
  handleChecked: ({ item, currentSelectedID, type, checked }: any) => {} | void;
};
const TableHeader = ({
  cols,
  draggable = true,
  handleDragCols = () => {},
  dragOver,
  classList,
  selectable,
  handleChecked,
}: Props) => {
  const handleDragStart = (e: any) => {
    const { id } = e.target;
    const idx = cols.map((e: any) => e.title).indexOf(id);
    e.dataTransfer.setData("colIdx", idx);
  };

  const handleDragOver = (e: any) => e.preventDefault();
  const handleDragEnter = (e: any) => {
    const { id } = e.target;
    dragOver = id;
    return e.target.classList.add(`${classList.thover}`);
  };
  const handleDragLeave = (e: any) => {
    return e.target.classList.remove(`${classList.thover}`);
  };

  const handleOnDrop = (e: any) => {
    const { id } = e.target;
    const droppedColIdx = cols.map((e: any) => e.title).indexOf(id);
    const draggedColIdx = e.dataTransfer.getData("colIdx");
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];

    e.target.classList.remove(`${classList.thover}`);
    handleDragCols(tempCols);
    dragOver = "";
  };

  const handleRenderHeader = useMemo(() => {
    if (isEmpty(cols)) return;
    return cols?.map((item: any, index: any) => (
      <th
        drag-over={item.title === dragOver}
        id={item?.title}
        key={item?.dataIndex}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        {item?.title}
      </th>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols]);

  const processingSelectData = (e: any) => {
    const isChecked = e.target.checked;
    return handleChecked({ type: "all", checked: isChecked });
  };

  return (
    <thead className="text-left bg-gray-100">
      <tr>
        {draggable && <th className="text-center p-1">#</th>}
        {selectable && (
          <th>
            <input type="checkbox" onChange={processingSelectData} />
          </th>
        )}
        {handleRenderHeader}
      </tr>
    </thead>
  );
};

export default TableHeader;
