import React, { useRef, useState } from "react";
import Row from "./Row";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

type Props = {
  dataSource?: [] | any;
  columns?: [] | any;
  draggable?: boolean;
  selectable?: boolean;
  onSelect?: (item: any, type: any) => {} | void;
};

const Table = ({
  columns,
  dataSource,
  draggable = true,
  selectable = true,
  onSelect = () => {},
}: Props) => {
  const [cols, setCols] = useState(columns);
  const [rows, setRows] = useState(dataSource);
  const [chkbox, setChkbox] = useState([] as any);

  const checkBoxDataRef = useRef([]);
  const dragOver = useRef(null);

  const handleDragCols = (newCols: any) => {
    setCols(newCols);
  };
  const handleDragRows = (newRows: any) => {
    setRows(newRows);
  };

  const handleChecked = ({ type, item, currentSelectedID, checked }: any) => {
    const handleType = new Map<"normal" | "all", () => {} | void>([
      [
        "normal",
        () => {
          return onSelect(item, type);
        },
      ],
      [
        "all",
        () => {
          const chkboxData = rows?.map((item: any) => {
            return item.key;
          });
          if (checked) {
            setChkbox(chkboxData);
            checkBoxDataRef.current = chkboxData;
            return onSelect(rows, type);
          }

          checkBoxDataRef.current = [];
          setChkbox([]);
          return onSelect([], type);
        },
      ],
    ]);

    return handleType?.get(type)?.() ?? {};
  };

  return (
    <table className="w-full">
      <TableHeader
        classList={styles}
        cols={cols}
        handleDragCols={handleDragCols}
        dragOver={dragOver.current}
        draggable={draggable}
        selectable={selectable}
        handleChecked={handleChecked}
      />
      <Row
        rows={rows}
        handleDragRows={handleDragRows}
        handleChecked={handleChecked}
        classList={styles}
        cols={cols}
        dragOver={dragOver.current}
        draggable={draggable}
        selectable={selectable}
        setChkbox={setChkbox}
        chkbox={chkbox}
        checkBoxDataRef={checkBoxDataRef}
      />
      <TableFooter />
    </table>
  );
};

export default Table;
