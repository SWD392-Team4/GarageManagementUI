import { signify } from "react-signify";

export const sCustomerManage = signify(
    {
        id: "",
        firstName: "",
        lastName: "",
        emailConfirmed: "",
        phoneNumber: "",
        phoneNumberConfirmed: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "sCustomerManage",
        },
    }
);
