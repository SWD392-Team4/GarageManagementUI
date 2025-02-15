import { signify } from "react-signify";

export const FilterAppointment = signify(
  {
    searchNamecus: "",
    searchNameEmp: "",
    startDate: "",
    endDate: "",
    type: "",
  },
  {
    cache: {
      key: "filterPost",
    },
  }
);
