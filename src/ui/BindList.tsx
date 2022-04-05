import React from "react";
import { BindMap } from "../lib/Bind";
import keys from "../lib/keys";
import "./BindList.scss";
import { Key } from "./KeyMap";

type Props = {
  binds: BindMap;
  onSetBinds: React.Dispatch<React.SetStateAction<BindMap>>;
};

const BindKey = ({ keycode }: { keycode: keyof typeof keys }) => <Key keycode={keycode}>{keys[keycode].caption}</Key>;

const BindList = ({ binds, onSetBinds }: Props) => {
  return (
    <div className="km-bindlist">
      {[...binds.entries()].map(([k, v], i) => {
        return (
          <div className="km-bind">
            <span className="km-bind__key">
              <BindKey keycode={k} />
            </span>
            <span className="km-bind__function">{v}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BindList;
