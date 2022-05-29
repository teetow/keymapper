import { CSSProperties, FunctionComponent, PropsWithChildren } from "react";
import { KeyIndex } from "../lib/keys";
import { styled } from "../stitches.config";

const KeyView = styled("div", {
  "--bg": `$colors$purple200`,
  "--fg": "$colors$primaryText",
  color: "var(--fg)",

  "--keycolspan": 1,
  "--keyrowspan": 1,
  gridColumn: "span calc(var(--keycolspan) * 2)",
  gridRow: "span calc(var(--keyrowspan) * 2)",

  display: "grid",
  gridTemplateAreas: "main",
  lineHeight: "0.8em",
  overflow: "hidden",
  placeItems: "center",
  textOverflow: "ellipsis",
  whiteSpace: "pre",

  "& > *": { gridArea: "main" },
  variants: {
    hasBind: {
      true: {
        "--fg": "white",
        "--bg": "$colors$blue300",
      },
    },
    hasHilight: {
      true: {
        "--bg": "$colors$purple600",
      },
    },
    isKey: {
      true: {
        backgroundColor: "var(--bg)",
        borderRadius: "$dot25",
        border: "1px solid $accent",
      },
    },
  },
  compoundVariants: [{
    hasBind: true,
    hasHilight: true,
    css: {
      "--bg": "$colors$blue400",
    }
  }],
  "&[data-keycode='Enter']": {
    backgroundColor: "transparent",
    borderWidth: 0,
    position: "relative",
    overflow: "visible",
    "&:after": {
      "--lw": "34%",
      backgroundColor: "var(--bg)",
      borderRadius: "$dot25",
      border: "1px solid $accent",
      boxSizing: "border-box",
      clipPath: "polygon(0 0, 100% 0, 100% 100%, var(--lw) 100%, var(--lw) 50%, 0 50%)",
      content: "",
      height: "calc(200% + $radii$dot25)",
      position: "absolute",
      right: "-1px",
      top: 0,
      width: "calc(100% + 1px)",
    },
  },
});

type KeyProps = PropsWithChildren<{
  hasBind?: boolean;
  hasHilight?: boolean;
  keycode: KeyIndex;
}>;

const keySizes: Partial<Record<KeyIndex, { c: number; r: number }>> = {
  NumpadAdd: { c: 1, r: 2 },
  Numpad0: { c: 2, r: 1 },
  NumpadEnter: { c: 1, r: 2 },

  Enter: { c: 1.5, r: 1 },
  Tab: { c: 1.5, r: 1 },

  Backspace: { c: 2, r: 1 },
  CapsLock: { c: 2, r: 1 },
  AltLeft: { c: 1.5, r: 1 },
  AltRight: { c: 1.5, r: 1 },
  ControlLeft: { c: 1.5, r: 1 },
  ControlRight: { c: 1.5, r: 1 },
  Space: { c: 6, r: 1 },

  ShiftLeft: { c: 1.5, r: 1 },
  ShiftRight: { c: 2.5, r: 1 },
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

  return (
    <KeyView hasBind={hasBind} hasHilight={hasHilight} isKey={keycode !== ""} data-keycode={keycode} style={keyStyle}>
      {children}
    </KeyView>
  );
};
