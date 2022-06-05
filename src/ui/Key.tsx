import { CSS } from "@stitches/react";
import React, { FunctionComponent, PropsWithChildren } from "react";
import { KeyIndex } from "../lib/keys";
import { styled } from "../stitches.config";

const KeyView = styled("div", {
  $$keyViewBg: `$colors$primaryBg`,
  $$keyViewBorderColor: "$colors$primaryAcc",
  $$keyViewFg: "$colors$primaryText",
  $$keyViewColSpan: 1,
  $$keyViewRowSpan: 1,
  color: "$$keyViewFg",
  display: "grid",
  gridColumn: "span calc($$keyViewColSpan * 2)",
  gridRow: "span calc($$keyViewRowSpan * 2)",
  lineHeight: "0.8em",
  overflow: "hidden",
  placeItems: "center",
  textOverflow: "ellipsis",
  whiteSpace: "pre",

  variants: {
    shape: {
      square: {},
      rect: {},
      enter: {},
    },
    hasBind: {
      true: {
        $$keyViewBg: "$colors$secondaryBg",
        $$keyViewBorderColor: "$colors$secondaryAcc",
        $$keyViewFg: "$colors$secondaryText",
      },
    },
    hasHilight: {
      true: {
        $$keyViewBg: "$colors$primaryBgHover",
      },
    },
    isKey: {
      true: {
        backgroundColor: "$$keyViewBg",
        borderRadius: "$dot25",
        border: "1px solid $$keyViewBorderColor",
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
        $$keyViewBg: "$colors$secondaryBgHover",
        $$keyViewBorderColor: "$colors$secondaryAcc",
      },
    },
    {
      isKey: true,
      shape: "enter",
      css: {
        borderRadius: "$dot25 $dot25 0 $dot25",
        position: "relative",
        overflow: "visible",
        "&:after": {
          "--lw": "34%",
          backgroundColor: "$$keyViewBg",
          border: "1px solid $$keyViewBorderColor",
          borderRadius: "0 0 $dot25 $dot25",
          borderWidth: "0 1px 1px 1px",
          boxSizing: "border-rect",
          content: "",
          height: "calc(100% + ($space$xs * 2) - 1px)",
          position: "absolute",
          right: "-1px",
          top: "calc(100%)",
          width: "calc(75% - $space$xs)",
        },
      },
    },
  ],
});

type KeyProps = PropsWithChildren<{
  isKey?: boolean;
  hasBind?: boolean;
  hasHilight?: boolean;
  keycode: KeyIndex;
  shape?: "square" | "rect" | "enter";
  colspan?: number;
  rowspan?: number;
  css?: CSS;
}> &
  React.ComponentProps<typeof KeyView>;

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
  isKey = false,
  hasHilight = false,
  hasBind = false,
  shape = "rect",
  css,
  children,
  colspan,
  rowspan,
}: KeyProps) => {
  const keyStyle = {
    $$keyViewColSpan: colspan || shape !== "square" ? keySizes[keycode]?.c || 1 : 1,
    $$keyViewRowSpan: rowspan || shape !== "square" ? keySizes[keycode]?.r || 1 : 1,
  } as CSS;

  return (
    <KeyView
      hasBind={hasBind}
      hasHilight={hasHilight}
      isKey={isKey}
      data-keycode={keycode}
      hasSmallText={children!.toString().length > 3}
      shape={shape}
      css={{ ...keyStyle, ...css }}
    >
      {children}
    </KeyView>
  );
};
