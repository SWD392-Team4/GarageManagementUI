import { signify } from "react-signify";

export const FilterAppointment = signify(
  {
    searchNamecus: "",
    searchEmailCus: "",
    startDate: "",
    endDate: "",
    type: "",
    status: "",
    pageCurrent: 1,
    search: 1,
  },
  {
    cache: {
      key: "filterA",
    },
  }
);
