import { useEffect, useRef, useState } from "react";
import keys, { KeyIndex } from "../lib/keys";

const modifiers = ["Ctrl", "Alt", "Shift"];
const specialKeys: Partial<Record<KeyIndex, Record<number, KeyIndex>>> = {
  enter: { 0: "enter", 3: "numpad_enter" },
};

const disambiguateKey = (e: KeyboardEvent) => {
  if (e === undefined) return "";
  if (e.key.toLocaleLowerCase() in specialKeys) {
    return (specialKeys[e.key.toLocaleLowerCase() as KeyIndex] || {})[e.location] as KeyIndex;
  }
  return e.key.toLocaleLowerCase() as KeyIndex;
};

const hasKey = (keyCode: string) => Object.keys(keys).findIndex((k) => k === keyCode.toLocaleLowerCase()) > -1;

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
