import { CSSProperties, FunctionComponent, PropsWithChildren } from "react";
import { KeyIndex } from "../lib/keys";
import { styled } from "../stitches.config";

const KeyView = styled("div", {
  "--bg": `$colors$purple200`,
  "--fg": "$colors$primaryText",
  "--bc": "$colors$purple300",
  "--keycolspan": 1,
  "--keyrowspan": 1,
  color: "var(--fg)",
  display: "grid",
  gridColumn: "span calc(var(--keycolspan) * 2)",
  gridRow: "span calc(var(--keyrowspan) * 2)",
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
        "--bc": "$colors$blue400",
      },
    },
    hasHilight: {
      true: {
        "--bg": "$colors$purple400",
      },
    },
    isKey: {
      true: {
        backgroundColor: "var(--bg)",
        borderRadius: "$dot25",
        border: "1px solid var(--bc)",
      },
    },
    hasSmallText: {
      true: {
        fontSize: "$xs",
      },
    },
  },
  compoundVariants: [
    {
      hasBind: true,
      hasHilight: true,
      css: {
        "--bg": "$colors$blue400",
        "--bc": "$colors$blue600",
      },
    },
  ],
  "&[data-keycode='Enter']": {
    borderRadius: "$dot25 $dot25 0 $dot25",
    position: "relative",
    overflow: "visible",
    "&:after": {
      "--lw": "34%",
      backgroundColor: "var(--bg)",
      border: "1px solid var(--bc)",
      borderRadius: "0 0 $dot25 $dot25",
      borderWidth: "0 1px 1px 1px",
      boxSizing: "border-box",
      content: "",
      height: "calc(100% + ($space$xs * 2) - 1px)",
      position: "absolute",
      right: "-1px",
      top: "calc(100%)",
      width: "calc(75% - $space$xs)",
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
    <KeyView
      hasBind={hasBind}
      hasHilight={hasHilight}
      isKey={keycode !== ""}
      data-keycode={keycode}
      style={keyStyle}
      hasSmallText={children!.toString().length > 3}
    >
      {children}
    </KeyView>
  );
};
