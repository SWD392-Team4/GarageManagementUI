import { signify } from "react-signify";

export const sSupplier = signify(
    {
        id: "",
        name: "",
        taxCode: "",
        address: "",
        province: "",
        district: "",
        wards: "",
        status: "",
        createdAt: "",
        updatedAt: "",
        supplierCategory: "",
    },
    {
        cache: {
            key: "sSupplier",
        },
    }
);
