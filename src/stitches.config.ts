import { blueDark, cyanDark, grayDark, greenDark, orangeDark, purpleDark, whiteA, yellowDark } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

const themeColorAliases = {
  appBg: "$gray2",
  appColor: "$gray12",

  primaryBg: "$gray6",
  primaryBgHover: "$gray9",
  primaryAcc: "$gray8",
  primaryText: "$gray11",

  secondaryBg: "$blue6",
  secondaryBgHover: "$blue9",
  secondaryAcc: "$blue8",
  secondaryText: "$blue12",
};

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } = createStitches({
  theme: {
    colors: {
      ...orangeDark,
      ...yellowDark,
      ...greenDark,
      ...cyanDark,
      ...blueDark,
      ...purpleDark,
      ...grayDark,
      ...whiteA,
      ...themeColorAliases,
    },
    fontSizes: {
      lg: "1.2rem",
      md: "1rem",
      sm: ".85rem",
      xs: ".66rem",
    },
    sizes: {
      xl: "2.0rem",
      lg: "1.5rem",
      md: "1rem",
      sm: ".75rem",
      xs: ".5rem",
    },
    space: {
      xl: "3rem",
      lg: "2rem",
      md: "1rem",
      sm: "0.5rem",
      xs: "0.25rem",
    },
    radii: {
      dot25: "0.25rem",
    },
  },
});
