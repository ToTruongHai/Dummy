import React, { useMemo, useRef, useState } from "react";
import Row from "./Row";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

type Props = {
  dataSource?: [] | any;
  columns?: [] | any;
  draggableRows?: boolean;
  draggableHeader?: boolean;
  selectable?: boolean;
  onSelect?: (item: any, type: any) => {} | void;
  onDrag?: (item: any, type: any) => {} | void;
};

type MapType = "normal" | "all";
type ResultMap = (item: any, type: any, checked: any) => {} | void;

const Table = ({
  columns,
  dataSource,
  draggableRows = false,
  draggableHeader = false,
  selectable = false,
  onDrag = () => {},
  onSelect = () => {},
}: Props) => {
  const [cols, setCols] = useState(columns);
  const [rows, setRows] = useState(dataSource);
  const [chkbox, setChkbox] = useState([] as any);

  const checkBoxDataRef = useRef([]);
  const dragOver = useRef(null);
  const theadRef = useRef(null);
  const hiddenSpanRef = useRef(null);

  const handleType = new Map<MapType, ResultMap>([
    [
      "normal",
      (item: any, type: any) => {
        const { allChkboxRef = {} as any } = theadRef.current ?? ({} as any);
        if (item.length === rows.length) allChkboxRef.current.checked = true;
        if (item.length !== rows.length) allChkboxRef.current.checked = false;
        return onSelect(item, type);
      },
    ],
    [
      "all",
      (_: any, type: any, checked: any) => {
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

  const handleDragCols = (newCols: any) => {
    setCols(newCols);
    return onDrag(newCols, "cols");
  };
  const handleDragRows = (newRows: any) => {
    setRows(newRows);
    return onDrag(newRows, "rows");
  };

  const handleChecked = ({ type, item, currentSelectedID, checked }: any) =>
    handleType?.get(type)?.(item, type, checked) ?? {};

  const handleDragMultipleRowDisplay = useMemo(
    () => (
      <span
        className="fixed hidden bg-white border border-slate-700 rounded p-2"
        ref={hiddenSpanRef}
      >
        {chkbox?.length} items
      </span>
    ),
    [chkbox]
  );

  return (
    <section className="Table w-full">
      <table className="w-full">
        <TableHeader
          ref={theadRef}
          classList={styles}
          cols={cols}
          handleDragCols={handleDragCols}
          dragOver={dragOver.current}
          draggable={draggableHeader}
          selectable={selectable}
          handleChecked={handleChecked}
        />
        <Row
          hiddenSpanRef={hiddenSpanRef}
          rows={rows}
          handleDragRows={handleDragRows}
          handleChecked={handleChecked}
          classList={styles}
          cols={cols}
          dragOver={dragOver.current}
          draggable={draggableRows}
          selectable={selectable}
          setChkbox={setChkbox}
          chkbox={chkbox}
          checkBoxDataRef={checkBoxDataRef}
        />
        <TableFooter />
      </table>
      {handleDragMultipleRowDisplay}
    </section>
  );
};

export default Table;
