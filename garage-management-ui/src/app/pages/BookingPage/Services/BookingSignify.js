import { signify } from "react-signify";

export const BookingSignify = signify(
  {
    garaId: "",
    brandId: "",
    carCategoryId: "",
    type: "",
    carModel: "",
    time: "",
  },
  {
    cache: {
      key: "sBookingSignify",
    },
  }
);
