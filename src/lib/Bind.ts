import { KeyIndex, ModKey } from "./keys";

export type BindMap = Array<Bind>;

export type Bind = {
  key: KeyIndex;
  function: string;
  mods?: ModKey[];
};

export const getBindHash = (bind: Bind) => `${bind.mods?.join("-")}-${bind.key}`;
