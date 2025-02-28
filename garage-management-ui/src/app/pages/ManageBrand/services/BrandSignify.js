import { signify } from "react-signify";

export const sBrand = signify(
    {
        Id: "",
        BrandName: "",
        LogoLink: "",
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
