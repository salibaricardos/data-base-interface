import React, { useState, useEffect } from "react";
import { TableComponent } from "../table";
import { User, userActions } from "../user.slice";
import { message } from "antd";
import { ColumnsType } from "antd/lib/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import history from "../history";
import { connect, ConnectedProps } from "react-redux";

interface item {
  data: [User];
  message: string;
}

const deleteUser = (id: string) => {
  axios
    .delete(`http://localhost:3000/users/${id}`)
    .then((res) => {
      message.success("The User Has Been Successfully Deleted");
    })
    .catch((err) => {
      message.error("The User Has Been Already Deleted", 3);
    });
};

type ReduxProps = ConnectedProps<typeof connector>;

function DataView(props: ReduxProps) {
  const { setCurrent } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState<item>();
  const [refresh, setRefresh] = useState(0);
  const columns: ColumnsType<any> = [
    {
      title: "id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Last Name ",
      dataIndex: "lastName",
      key: "LastName",
      align: "center",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Creating Date",
      dataIndex: "creatingDate",
      key: "creatingDate",
    },
    {
      title: "Updating Date",
      dataIndex: "updatingDate",
      key: "updatingDate",
    },
    {
      title: "Actions",
      key: "action",
      dataIndex: "action",
      fixed: "right",
      align: "center",
      width: 120,
      render: (value, row) => (
        <div>
          <DeleteOutlined
            onClick={() => {
              deleteUser(row._id);
              setRefresh(+1);
            }}
          />
          <EditOutlined
            onClick={() => {
              setCurrent(row);
              console.log(row);
              history.push("/DataEdit");
            }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [refresh]);
  if (error) {
    return <div>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <TableComponent
          columns={columns}
          dataSource={items?.data}
        ></TableComponent>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setCurrent: userActions.setCurrent,
};

const connector = connect(null, mapDispatchToProps);
export default connect(null, mapDispatchToProps)(DataView);
