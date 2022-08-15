import { atom } from "recoil";

export const modalAtom = atom({
    key: "modalAtom", // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});
