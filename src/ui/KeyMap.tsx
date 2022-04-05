import classNames from "classnames";
import { CSSProperties, FunctionComponent, PropsWithChildren } from "react";
import { BindMap } from "../lib/Bind";
import keys, { KeyIndex, keyOrder } from "../lib/keys";
import "./KeyMap.scss";

type KeyProps = PropsWithChildren<{
  keycode: string;
  hasHilight?: boolean;
  hasBind?: boolean;
}>;

const keySizes: Record<string, { c: number; r: number }> = {
  add: { c: 1, r: 2 },
  numpad_0: { c: 2, r: 1 },
  numpad_enter: { c: 1, r: 2 },

  enter: { c: 1.5, r: 1 },
  tab: { c: 1.5, r: 1 },

  backspace: { c: 2, r: 1 },
  caps_lock: { c: 2, r: 1 },
  alt: { c: 1.5, r: 1 },
  alt_right: { c: 1.5, r: 1 },
  ctrl: { c: 1.5, r: 1 },
  control_right: { c: 1.5, r: 1 },
  space: { c: 6, r: 1 },

  shift: { c: 1.5, r: 1 },
  shift_right: { c: 2.5, r: 1 },
};

export const Key: FunctionComponent<KeyProps> = ({
  keycode,
  hasHilight = false,
  hasBind = false,
  children,
}: KeyProps) => {
  const keyStyle = {
    "--keycolspan": keySizes[keycode]?.c || 1,
    "--keyrowspan": keySizes[keycode]?.r || 1,
  } as CSSProperties;

  const classes = classNames({
    "km-key": true,
    "km-key--is-key": keycode !== "",
    "km-key--has-hilight": hasHilight,
    "km-key--has-bind": hasBind,
    [`km-key--${keycode}`]: keycode !== "",
  });

  return (
    <div className={classes} data-keycode={keycode} style={keyStyle}>
      {children}
    </div>
  );
};

type Props = {
  binds: BindMap;
  activeKeys: KeyIndex[];
  onSetBinds: (binds: BindMap) => void;
};

const KeyMap: FunctionComponent<Props> = ({ binds, activeKeys, onSetBinds }) => {
  return (
    <>
      <div className="km-keymap">
        {keyOrder.map((k, i) => (
          <Key key={`${k}-${i}`} keycode={k} hasHilight={binds.has(k)}>
            {keys[k].caption}
          </Key>
        ))}
      </div>
    </>
  );
};

export default KeyMap;
