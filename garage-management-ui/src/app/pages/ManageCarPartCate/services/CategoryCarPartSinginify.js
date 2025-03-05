import { signify } from "react-signify";

export const sCategoryCarPart = signify(
    {
        id: "",
        partCategory: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "sCategoryCarPart",
        },
    }
);
