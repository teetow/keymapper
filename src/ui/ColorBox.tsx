import { styled } from "@stitches/react";
import { Box } from "./Box";

const ColorBox = styled("div", {
  width: "1em",
  height: "1em",
});

const colorMatrix = {
  colors: ["red", "yellow", "green", "blue", "purple", "gray"],
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};

export const ColorBoxes = () => {
  return (
    <Box
      grid
      css={{
        gridAutoFlow: "column",
        gridTemplateColumns: `repeat(${colorMatrix.colors.length}, 1fr)`,
        gridTemplateRows: `repeat(${colorMatrix.values.length}, 1fr)`,
        alignItems: "start",
        margin: "auto",
        gap: "1px",
        lineHeight: 0,
      }}
    >
      {colorMatrix.colors.map((color) =>
        colorMatrix.values.map((val) => (
          <ColorBox
            css={{
              backgroundColor: `$colors$${color}${val * 100}`,
            }}
          />
        ))
      )}
      ;
    </Box>
  );
};
