import { atom } from "recoil";

export const signup=atom({
    key: "signup",
    default: {
        Name: "",
        Email: "",
        Phone: 0,
        Password: "",
        ConfirmPassword: ""  
    }
})