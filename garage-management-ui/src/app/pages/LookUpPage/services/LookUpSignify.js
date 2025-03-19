import { signify } from "react-signify";

export const sLookUp = signify(
    {
        garareId: "",
        VerifyCode: "",
        CustomerEmail: "",
        CustomerPhoneNumber: "",
        EstimatedTime: "",
    },
    {
        cache: {
            key: "sLookUp",
        },
    }
);
