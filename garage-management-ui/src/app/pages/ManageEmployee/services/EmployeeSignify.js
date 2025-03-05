import { signify } from "react-signify";

export const sEmployee = signify(
    {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "sEmployee",
        },
    }
);
