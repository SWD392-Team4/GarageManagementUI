import { signify } from "react-signify";

export const sCarPart = signify(
    {
        Id: "",
        PartCategory: "",
        Status: "",
        CreatedAt: "",
        UpdatedAt: "",
    },
    {
        cache: {
            key: "CarPart",
        },
    }
);
