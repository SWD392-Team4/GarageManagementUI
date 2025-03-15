import { signify } from "react-signify";

export const BookingSignify = signify(
  {
    garaId: "",
    brandId: "",
    carCategoryId: "",
    type: "",
    carModel: "",
    carPartId: "",
    services: [],
    package: [],
  },
  {
    cache: {
      key: "sBookingSignify",
    },
  }
);
