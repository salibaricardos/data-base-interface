import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import DataEdit from "./pages/dataEdit";
import DataView from "./pages/datatView";
import { Menu } from "antd";
import history from "./history";
import "antd/dist/antd.css";

function App() {
  return (
    <div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="horizontal">
        <Menu.Item
          key="1"
          className="nav-item"
          onClick={() => history.push("/")}
        >
          <p>Display Data</p>
        </Menu.Item>
        <Menu.Item
          key="2"
          className="nav-item"
          onClick={() => history.push("/DataEdit")}
        >
          <p>Add Data</p>
        </Menu.Item>
      </Menu>

      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <DataView />
          </Route>
          <Route path="/DataEdit">
            <DataEdit />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
