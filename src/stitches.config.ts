import { createStitches } from "@stitches/react";
import { makeColorScale } from "./lib/color";

const primitives = {
  red: "hsl(5, 70%, 58%)",
  yellow: "hsl(35, 100%, 70%)",
  green: "hsl(135, 56%, 51%)",
  blue: "hsl(205, 100%, 62%)",
  purple: "hsl(270, 40%, 60%)",
  gray: "hsl(0, 0, 50%)",
};

const themeColors = {
  ...makeColorScale(primitives.red, "red"),
  ...makeColorScale(primitives.yellow, "yellow"),
  ...makeColorScale(primitives.green, "green"),
  ...makeColorScale(primitives.blue, "blue"),
  ...makeColorScale(primitives.purple, "purple"),
  ...makeColorScale(primitives.gray, "gray"),

  gray65: "hsla(0, 0, 65, 1)",
  gray25: "hsla(0, 0, 25, 1)",

  white85: "hsl(286, 21%, 84%)",
};

const themeColorAliases = {
  accent: "$purple300",
  accentStrong: "$purple500",
  appBg: "$purple100",
  fg: "$white85",
  primaryText: "$purple700",
};

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
  theme: {
    colors: { ...themeColors, ...themeColorAliases },
    fontSizes: {
      lg: "1.3rem",
      md: "1rem",
      sm: ".75rem",
    },
    sizes: {},
    space: {
      lg: "2em",
    },
    radii: {
      dot25: "0.25em",
    },
  },
});
