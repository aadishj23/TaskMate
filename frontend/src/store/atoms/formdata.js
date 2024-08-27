import { atom } from "recoil";

export const formdata = atom({
    key: "formdata",
    default: {
        title: "",
        description: ""
    }
});      