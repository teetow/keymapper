import tinycolor from "tinycolor2";
import { ColorInput } from "tinycolor2";
import { clamp } from "./utils";

const gradientSteps = [
  { h: 1.0, l: 0.1, s: 0.3 }, // 100
  { h: 1.0, l: 0.2, s: 0.6 }, // 200
  { h: 1.0, l: 0.3, s: 0.7 }, // 300
  { h: 1.0, l: 0.5, s: 0.8 }, // 400
  { h: 1.0, l: 0.7, s: 0.9 }, // 500
  { h: 1.0, l: 0.9, s: 1.0 }, // 600
  { h: 1.0, l: 1.0, s: 0.5 }, // 700
  { h: 1.0, l: 1.3, s: 0.4 }, // 800
  { h: 1.0, l: 1.5, s: 0.3 }, // 900
];

export const makeColorScale = (baseColor: ColorInput, name: string) => {
  const color = tinycolor(baseColor).toHsl();
  return gradientSteps.reduce((acc, step, i) => {
    return {
      ...acc,
      [`${name}${(i + 1) * 100}`]: tinycolor({
        h: clamp(color.h * step.h, 360),
        s: clamp(color.s * step.s),
        l: clamp(color.l * step.l),
      }),
    };
  }, {});
};
