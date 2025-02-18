import { signify } from "react-signify";

export const sCategory = signify(
    {
        Id: "",
        Category: "",
        Status: "",
        CreatedAt: "",
        UpdatedAt: "",
    },
    {
        cache: {
            key: "Category",
        },
    }
);
