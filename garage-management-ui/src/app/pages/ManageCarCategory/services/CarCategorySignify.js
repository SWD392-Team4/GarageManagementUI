import { signify } from "react-signify";

export const sCarCategory = signify(
    {
        id: "",
        category: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "sCarCategory",
        },
    }
);
