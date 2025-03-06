import { signify } from "react-signify";

export const sService = signify(
    {
        id: "",
        serviceName: "",
        serviceCategory: "",
        partName: "",
        category: "",
        price: "",
        workNature: "",
        action: "",
        estimatedHours: "",
        status: "",
    },
    {
        cache: {
            key: "sService",
        },
    }
);