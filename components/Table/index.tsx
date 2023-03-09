import React from "react";
import Column from "./Column";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import TableHeader from "./TableHeader";

type Props = {
  dataSource?: [] | any;
  columns?: [] | any;
  draggable?: boolean;
};

const Table = ({ columns, dataSource, draggable = true }: Props) => {
  return (
    <table className="w-full">
      <TableHeader draggable={draggable} data={columns} />
      <Column
        data={dataSource}
        columns={columns}
        draggable={draggable}
        classList={styles}
      />
      <TableFooter />
    </table>
  );
};

export default Table;
