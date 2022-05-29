import { useEffect, useRef, useState } from "react";
import keynames, { KeyIndex } from "../lib/keys";

const modifiers = ["Ctrl", "Alt", "Shift"];
const specialKeys: Partial<Record<KeyIndex, Record<number, KeyIndex>>> = {
  Enter: { 0: "Enter", 3: "NumpadEnter" },
};

const ambiguousKeys: Partial<Record<KeyIndex, Record<"key" | "actualKey", KeyIndex>>> = {
  NumLock: { key: "Pause", actualKey: "NumLock" },
};

const disambiguateKey = (e: KeyboardEvent) => {
  if (e === undefined) return "";

  if (e.code !== e.key) {
    if (e.code in ambiguousKeys) {
      return ambiguousKeys[e.code as KeyIndex]?.actualKey as KeyIndex;
    }
  }

  if (e.code in specialKeys) {
    return specialKeys[e.code as KeyIndex]![e.location];
  }
  return e.code as KeyIndex;
};

const hasKey = (keyCode: string) => Object.keys(keynames).findIndex((k) => k === keyCode.toLocaleLowerCase()) > -1;

const useActiveKeys = (element: HTMLElement) => {
  const ref = useRef<HTMLElement>(element);

  const [activeKeys, setActiveKeys] = useState<KeyIndex[]>([]);
  const [currentEvent, setCurrentEvent] = useState<KeyboardEvent>();

  const handleKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentEvent(e);
  };

  useEffect(() => {
    if (currentEvent === undefined) return;

    let mods = [currentEvent.ctrlKey, currentEvent.altKey, currentEvent.shiftKey]
      .map((key, index) => (key ? modifiers[index] : ""))
      .filter((key) => key !== "")
      .filter(hasKey)
      .map((k) => `${k}-`) as KeyIndex[];

    setActiveKeys((prev) => [...mods, disambiguateKey(currentEvent)]);
  }, [currentEvent]);

  useEffect(() => {
    const savedRef = ref.current;
    savedRef.addEventListener("keydown", handleKeyDown);
    return () => savedRef.removeEventListener("keydown", handleKeyDown);
  }, [ref]);

  return [activeKeys, setActiveKeys] as const;
};

export default useActiveKeys;
