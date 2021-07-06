import PageSetup from "./PageSetup";

import { connect } from "react-redux";
import { useEffect } from "react";

import * as ActionType from './Store/actionTypes';

// Log system

let ipcRenderer = null;

try {
  const electron = window.require("electron");
  const fs = electron.remote.require("fs");
   ipcRenderer = electron.ipcRenderer;

  window.desktop = true;
} catch {
  console.log("browser");
}

function App({ dispatch }) {
  useEffect(() => {
    console.log(window.desktop);
    if (window.desktop) {
      ipcRenderer.on("asynchronous-message", function (evt, message) {
        dispatch({type: ActionType.SEND_LOG, message:message })
      });
    }
  }, []);

  return (
    <div className="App">
      <PageSetup />
    </div>
  );
}

export default connect()(App);
