import { signify } from "react-signify";

export const sService = signify(
    {
        Id: "",
        ServiceName: "",
        ServiceCategory: "",
        PartName: "",
        Category: "",
        Price: "",
        WorkNature: "",
        Action: "",
        Description: "",
        ImageLink: [],
        EstimatedHours: "",
        Status: "",
    },
    {
        cache: {
            key: "sService",
        },
    }
);