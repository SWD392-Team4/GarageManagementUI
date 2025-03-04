import { signify } from "react-signify";

export const sCarCategory = signify(
    {
        id: "",
        category: "",
        description: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "CarCategory",
        },
    }
);
