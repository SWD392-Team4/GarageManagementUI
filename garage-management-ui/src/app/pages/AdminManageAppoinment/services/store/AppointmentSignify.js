import { signify } from "react-signify";

export const AppointmentSignify = signify(
  {
    packageCurrent: "",
  },
  {
    cache: {
      key: "sListApointment",
    },
  }
);
