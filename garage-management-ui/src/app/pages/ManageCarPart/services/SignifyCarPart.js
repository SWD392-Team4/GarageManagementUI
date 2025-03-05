import { signify } from "react-signify";

export const sCarPart = signify(
    {
        id: "",
        partName: "",
        partCategory: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "CarPart",
        },
    }
);
