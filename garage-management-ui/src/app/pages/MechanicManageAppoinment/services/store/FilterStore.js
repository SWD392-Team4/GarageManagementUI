import { signify } from "react-signify";

export const FilterAppointment = signify(
  {
    searchNamecus: "",
    startDate: "",
    endDate: "",
    type: "",
    status: "",
  },
  {
    cache: {
      key: "filterAppointment",
    },
  }
);
