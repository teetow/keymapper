import { useEffect, useRef, useState } from "react";
import { KeyIndex } from "../lib/keys";

type ModKey = {
  keyCode: KeyIndex;
  location: number;
  getter: (event: KeyboardEvent) => boolean;
};

const modifiers = [
  {
    keyCode: "ControlLeft",
    location: 1,
    getter: (e) => e.ctrlKey,
  },
  {
    keyCode: "AltLeft",
    location: 1,
    getter: (e) => e.altKey,
  },
  {
    keyCode: "ShiftLeft",
    location: 1,
    getter: (e) => e.shiftKey,
  },
] as ModKey[];

const specialKeys: Partial<Record<KeyIndex, Record<number, KeyIndex>>> = {
  Enter: { 0: "Enter", 3: "NumpadEnter" },
};

const ambiguousKeys: Partial<Record<KeyIndex, Record<"key" | "actualKey", KeyIndex>>> = {
  NumLock: { key: "Pause", actualKey: "NumLock" },
};

const disambiguateKey = (e: KeyboardEvent) => {
  if (e === undefined || e.repeat) return "FullEmptySpace";

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

const getModifiers = (event: KeyboardEvent) => modifiers.filter((key) => key.getter(event));

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

    const currentKeys = disambiguateKey(currentEvent);
    const mods = getModifiers(currentEvent).map((modKey) => modKey.keyCode);

    setActiveKeys((prev) => [...mods, currentKeys]);
  }, [currentEvent]);

  useEffect(() => {
    const savedRef = ref.current;
    savedRef.addEventListener("keydown", handleKeyDown);
    return () => savedRef.removeEventListener("keydown", handleKeyDown);
  }, [ref]);

  return [activeKeys, setActiveKeys] as const;
};

export default useActiveKeys;
