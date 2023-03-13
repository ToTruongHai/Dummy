import Table from "components/Table";
import React from "react";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    render: (_: any, { tags }: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return <span key={tag}>{tag.toUpperCase()}</span>;
        })}
      </>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    render: (_: any, record: any) => (
      <span>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </span>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: "4",
    name: "Joe Mama",
    age: 22,
    address: "Sydney No. 1 Lake Park",
    tags: ["real", "shit"],
  },
];

const TestPage = () => {
  const handleOnItemSelect = (item: any) => {
    console.log({ item });
  };

  return (
    <div>
      <h3>Test Table</h3>
      <br />
      <br />
      <br />
      <Table
        columns={columns}
        dataSource={data}
        onSelect={handleOnItemSelect}
      />
    </div>
  );
};

export default TestPage;
