import { signify } from "react-signify";

export const sProduct = signify(
    {
        id: "",
        productName: "",
        productBarcode: "",
        productPrice: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "sProduct",
        },
    }
);
