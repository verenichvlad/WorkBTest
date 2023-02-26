import { atom } from "jotai";

export const activeCharacterIdAtom = atom<number | null>(null);
export const activePageAtom = atom<number>(0);
