import { atom } from "recoil";

export const modalAtom = atom({
    key: "modalAtom",
    default: false,
});

export const postIdAtom = atom({
    key: "postIdAtom",
    default: "id",
});
