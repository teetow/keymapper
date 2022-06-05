import { globalCss } from "@stitches/react";
import { useState } from "react";
import { BindMap } from "./lib/Bind";
import keyTable, { KeyIndex } from "./lib/keys";
import { styled } from "./stitches.config";
import BindList from "./ui/BindList";
import { CurrentBindView } from "./ui/CurrentBind";
import KeyMap from "./ui/KeyMap";
import useActiveKeys from "./ui/withActiveKeys";

const dev = false;

const globalStyles = globalCss({
  body: {
    backgroundColor: "$appBg",
    color: "$appColor",
    height: "100vh",
    padding: "$lg 0",
    fontSize: "17px",
    margin: 0,
  },
});

const defaultBinds: BindMap = [
  { key: "Backspace", function: "Delete item" },
  { key: "KeyD", function: "Delete all items", mods: ["ShiftLeft"] },
  // { key: "KeyD", function: "Delete item" },
  // { key: "Enter", function: "Confirm choice" },
];

const getKeyCode = (key: KeyIndex) => {
  if (key in keyTable) return keyTable[key].code;
  return key;
};

const AppView = styled("div", {
  display: "grid",
  gap: "$lg",
  fontFamily: "sans-serif",
});

function App() {
  const [binds, setBinds] = useState<BindMap>(defaultBinds);
  const [activeKeys] = useActiveKeys(document.body);

  globalStyles();

  return (
    <AppView>
      <KeyMap binds={binds} onSetBinds={setBinds} activeKeys={activeKeys} />
      {dev && (
        <>
          <CurrentBindView>{activeKeys.map(getKeyCode)}</CurrentBindView>
          <BindList binds={binds} onSetBinds={setBinds} activeKeys={activeKeys} />
        </>
      )}
    </AppView>
  );
}

export default App;
