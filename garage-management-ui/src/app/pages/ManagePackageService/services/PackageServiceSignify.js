import { signify } from "react-signify";


export const sPackageService = signify(
    {

        id: "",
        serviceCategory: "",
        category: "",
        packageName: "",
        type: "",
        status: "",
        packagePrice: "",
        validityPeriod: "",
        timeUnit: "",
        usageLimit: "",
        createdAt: "",
        updatedAt: ""

    },
    {
        cache: {
            key: "sPackageService",
        },
    }
)


export const sPackageHistory = signify(
    {

        id: "",
        serviceCategory: "",
        category: "",
        packageName: "",
        type: "",
        status: "",
        packagePrice: "",
        validityPeriod: "",
        timeUnit: "",
        usageLimit: "",
        createdAt: "",
        updatedAt: ""

    },
    {
        cache: {
            key: "sPackageHistory",
        },
    }
)

