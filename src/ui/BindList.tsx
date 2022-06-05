import React from "react";
import { BindMap, getBindHash } from "../lib/Bind";
import keynames, { KeyIndex } from "../lib/keys";
import { styled } from "../stitches.config";
import { Box } from "./Box";
import { Key } from "./Key";

const BindListView = styled("div", {
  display: "grid",
  margin: "3rem",
  gridTemplateColumns: "auto 1fr",
  gap: "$lg",
});

const BindKey = ({ children, ...props }: React.ComponentProps<typeof Key>) => (
  <Key
    {...props}
    css={{
      "--keycolspan": "0.5",
      "--keyrowspan": "0.5",
      width: "3rem",
      height: "3rem",
    }}
  >
    {children}
  </Key>
);

type Props = {
  activeKeys: KeyIndex[];
  binds: BindMap;
  onSetBinds: React.Dispatch<React.SetStateAction<BindMap>>;
};

const BindList = ({ binds, activeKeys }: Props) => {
  return (
    <BindListView>
      {[...binds.entries()].map(([index, bind]) => {
        return (
          <Box className="bind" key={getBindHash(bind)} css={{ display: "contents" }}>
            <Box css={{ gridColumn: "1 / 2", display: "flex" }} className="mods">
              {bind.mods?.map((mod) => (
                <BindKey key={mod} keycode={mod} isKey={true} className="bindkey">
                  {keynames[mod].caption}
                </BindKey>
              ))}

              <BindKey className="key" keycode={bind.key} hasBind={activeKeys.includes(bind.key)} isKey={true}>
                <span>{keynames[bind.key].caption}</span>
              </BindKey>
            </Box>
            <Box className="function" css={{ gridColumn: "2/3" }}>
              {bind.function}
            </Box>
          </Box>
        );
      })}
    </BindListView>
  );
};

export default BindList;
