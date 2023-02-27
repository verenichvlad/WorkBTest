import { atom } from "jotai";

export const activeCharacterIdAtom = atom<number | null>(null);
export const activePageAtom = atom<number>(0);
export const readingListAtom = atom<ReadingListEntry[]>([]);

export type ReadingListEntry = {
  id: number;
  title: string;
  img: string;
};
