import { signify } from "react-signify";

export const sBrand = signify(
    {
        id: "",
        brandName: "",
        imageLink: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "sBrand",
        },
    }
);
