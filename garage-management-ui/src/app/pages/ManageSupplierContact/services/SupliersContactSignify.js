import { signify } from "react-signify";

export const sSuplierContact = signify(
    {
        id: "",
        contactPersonName: "",
        contactPosition: "",
        contactPhoneNumber: "",
        contactEmail: "",
        status: "",
        createdAt: "",
        updatedAt: "",
    },
    {
        cache: {
            key: "sSuplierContact",
        },
    }
);
