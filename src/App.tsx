import { useState } from "react";
import "./App.scss";
import { BindMap } from "./lib/Bind";
import { KeyIndex } from "./lib/keys";
import BindList from "./ui/BindList";
import KeyMap from "./ui/KeyMap";
import useActiveKeys from "./ui/withActiveKeys";

const defaultBinds = new Map<KeyIndex, string>([
  ["backspace", "Delete item"],
  ["enter", "Confirm choice"],
]);

function App() {
  const [binds, setBinds] = useState<BindMap>(defaultBinds);
  const [activeKeys, setActiveKeys] = useActiveKeys(document.body);

  return (
    <div className="App">
      <KeyMap binds={binds} onSetBinds={setBinds} activeKeys={activeKeys} />
      <div className="km-currentkeys">{activeKeys}</div>
      <BindList binds={binds} onSetBinds={setBinds} />
    </div>
  );
}

export default App;
