import { signify } from "react-signify";

export const sCarModal = signify(
    {
        id: "",
        brandName: "",
        category: "",
        modelName: "",
        modelYear: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "sCarModal",
        },
    }
);
