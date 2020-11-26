import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { Current, User } from "../user.slice";
import { Button, Input, Form, message } from "antd";
import { connect, ConnectedProps } from "react-redux";
type ReduxProps = ConnectedProps<typeof connector>;
function DataEdit(props: ReduxProps) {
  const [user, setuser] = useState<any>();
  const { id } = props;
  console.log(id);
  return (
    <div>
      <Form>
        <Input
          type="text"
          placeholder="your Name"
          onChange={(val) => setuser({ ...user, name: val.target.value })}
        />
        <Input
          type="text"
          placeholder="lastName"
          onChange={(val) => {
            let temp: User = user!;
            temp.lastName = val.target.value;
            setuser(temp);
          }}
        />
        <Input
          type="text"
          placeholder="age"
          onChange={(val) => {
            let temp: User = user!;
            temp.age = parseInt(val.target.value);
            setuser(temp);
          }}
        />
        <Input
          type="text"
          placeholder="Phone Number"
          onChange={(val) => {
            let temp: User = user!;
            temp.phoneNumber = parseInt(val.target.value);
            setuser(temp);
          }}
        />
        <Input
          type="text"
          placeholder="Email"
          onChange={(val) => {
            let temp: User = user!;
            temp.email = val.target.value;
            setuser(temp);
          }}
        />
      </Form>
      <div className="buttons">
        <Button
          onClick={() => {
            addUser(user);
          }}
        >
          ADD USER
        </Button>

        <Button
          onClick={() => {
            updateUser(id!, user);
          }}
        >
          UPDATE
        </Button>
      </div>
    </div>
  );
}

const updateUser = (id: string, users: User | undefined) => {
  axios
    .put(`http://localhost:3000/users/${id}`, users)
    .then((res) => {
      message.success("User Has Been Successfully Updated", 3);
    })
    .catch((err) => {
      message.error(
        "User Has Not Been Updated Please Click On THe Edit Icon In The Table",
        7
      );
    });
};

const addUser = (users: User | undefined) => {
  axios
    .post(`http://localhost:3000/users`, users)
    .then((res) => {
      message.success("User Has Been Successfully Added", 3);
    })
    .catch((err) => {
      message.error(
        "User Has Not Been Added Please Check if Name ,Last Name And Age Are Filled Or the email alredy existe",
        7
      );
    });
};

const mapStateToProps = (state: Current) => {
  return {
    id: state.current._id,
  };
};
const connector = connect(mapStateToProps);

export default connect(mapStateToProps)(DataEdit);
