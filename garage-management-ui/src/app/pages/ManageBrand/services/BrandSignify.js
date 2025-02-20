import { signify } from "react-signify";

export const sBrand = signify(
    {
        Id: "",
        BrandName: "",
        Status: "",
        CreatedAt: "",
        UpdatedAt: "",
    },
    {
        cache: {
            key: "Brand",
        },
    }
);
