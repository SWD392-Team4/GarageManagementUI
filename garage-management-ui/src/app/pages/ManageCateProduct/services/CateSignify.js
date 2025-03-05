import { signify } from "react-signify";

export const sProductCategory = signify(
    {
        id: "",
        category: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "sProductCategory",
        },
    }
);
