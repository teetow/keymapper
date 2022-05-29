import { styled } from "../stitches.config";
import React from "react";

import { Bind, BindMap, getBindHash } from "../lib/Bind";
import keynames, { KeyIndex } from "../lib/keys";
import { Key } from "./Key";

const BindListView = styled("div", {
  display: "grid",
  margin: "3em",
  gridAutoColumns: "min-content",
  gridTemplateAreas: "key function",
});

const BindView = styled("div", { width: "3em", display: "grid", gridTemplateAreas: "main" });

type Props = {
  activeKeys: KeyIndex[];
  binds: BindMap;
  onSetBinds: React.Dispatch<React.SetStateAction<BindMap>>;
};

const BindKey = ({ bind, hasHilight }: { bind: Bind; hasHilight?: boolean }) => (
  <BindView>
    {bind.mods?.map((mod) => (
      <div className="km-bind__mods" key={mod}>
        <Key keycode={mod}>
          {keynames[mod].caption}
        </Key>
      </div>
    ))}
    <Key keycode={bind.key} hasBind={hasHilight}>
      <span>{keynames[bind.key].caption}</span>
    </Key>
  </BindView>
);

const BindList = ({ binds, activeKeys }: Props) => {
  return (
    <BindListView>
      {[...binds.entries()].map(([index, bind]) => {
        return (
          <div className="km-bind" key={getBindHash(bind)}>
            <span className="km-bind__key">
              <BindKey bind={bind} hasHilight={activeKeys.includes(bind.key)} />
            </span>
            <span className="km-bind__function">{bind.function}</span>
          </div>
        );
      })}
    </BindListView>
  );
};

export default BindList;
