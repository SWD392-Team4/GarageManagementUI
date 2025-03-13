import { signify } from "react-signify";

export const sService = signify(
    {
        id: "",
        serviceName: "",
        serviceCategory: "",
        carPart: "",
        carCategory: "",
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