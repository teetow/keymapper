import { FunctionComponent } from "react";
import { BindMap } from "../lib/Bind";
import keynames, { KeyIndex, keyOrder } from "../lib/keys";
import { styled } from "../stitches.config";
import { Key } from "./Key";

const KeyMapView = styled("div", {
  alignItems: "stretch",
  display: "grid",
  fontSize: "$sm",
  gap: "$xs",
  gridTemplateColumns: "repeat(46, 1.5vw)",
  gridTemplateRows: "repeat(13, $md)",
  justifyContent: "center",
  userSelect: "none",
});

type Props = {
  binds: BindMap;
  activeKeys: KeyIndex[];
  onSetBinds: (binds: BindMap) => void;
};

const KeyMap: FunctionComponent<Props> = ({ binds, activeKeys }) => {
  return (
    <KeyMapView>
      {keyOrder.map((k, i) => (
        <Key
          key={`${k}-${i}`}
          keycode={k}
          hasBind={binds.some((b) => b.key === k)}
          hasHilight={activeKeys.includes(k)}
          isKey={!["HalfEmptySpace", "FullEmptySpace", "HalfHeightEmptySpace"].includes(k)}
          shape={k === "Enter" ? "enter" : "rect"}
        >
          {keynames[k].caption || ""}
        </Key>
      ))}
    </KeyMapView>
  );
};

export default KeyMap;
