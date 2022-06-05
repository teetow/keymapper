import { styled } from "../stitches.config";

export const Box = styled("div", {
  variants: {
    grid: {
      true: {
        display: "grid",
      },
    },
  },
});
