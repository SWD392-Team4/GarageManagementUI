import { signify } from "react-signify";

export const sProduct = signify(
    {
        Id: "",
        BrandName: "",
        ImageLink: "",
        Status: "",
        CreatedAt: "",
        UpdatedAt: "",

        //     {
        //     // "id": "9791dc34-ecba-4980-bf82-663f14d4a68b",
        //     // "productName": "Stringaaa",
        //     // "productBarcode": "8936572323432",
        //     // "productPrice": 240000,
        //     // "productDescription": "aa",
        //     // "status": "Inactive",
        //     // "createdAt": "2025-03-04T17:55:26.2508445+07:00",
        //     // "updatedAt": "2025-03-04T17:55:26.2508609+07:00"
        // }
    },
    {
        cache: {
            key: "sProduct",
        },
    }
);
