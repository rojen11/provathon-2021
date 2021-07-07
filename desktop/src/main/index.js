"use strict";

import { app, BrowserWindow, nativeTheme } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";

const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;

function createMainWindow() {
  const window = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    fullscreen: true,
  });

  // if (isDevelopment) {
  //   window.webContents.openDevTools();
  // }

  window.loadURL(`http://localhost:3000`);

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });


  nativeTheme.themeSource = 'light';

  // log events
  window.on('minimize', (e) => {
    window.webContents.send('asynchronous-message', {'event': 'minimized'})
    console.log('Minimized');
    
  })

  window.on('blur', (e) => {
    window.webContents.send('asynchronous-message', {'event': 'blured'})

  })

  window.on('focus', (e) => {
    window.webContents.send('asynchronous-message', {'event': 'focus'})
  })


  window.on('resize', (e) => {
    window.webContents.send('asynchronous-message', {'event': 'resize'})
  })

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});
