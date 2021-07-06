import PageSetup from "./PageSetup";

try {
  const electron = window.require('electron');
  const fs = electron.remote.require('fs');
  const ipcRenderer  = electron.ipcRenderer;

  window.desktop = true;

} catch {
  console.log('browser');
}

function App() {
  return (
    <div className="App">
      <PageSetup />
    </div>
  );
}

export default App;
