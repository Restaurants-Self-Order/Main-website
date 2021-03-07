import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Modal from "react-modal";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

Modal.setAppElement("#root");

const options = {
  timeout: 15000,
  position: positions.TOP_RIGHT
};
ReactDOM.render(
 <AlertProvider template={AlertTemplate} {...options}>
  <App />
  </AlertProvider>
  ,
  document.getElementById("root")
);
