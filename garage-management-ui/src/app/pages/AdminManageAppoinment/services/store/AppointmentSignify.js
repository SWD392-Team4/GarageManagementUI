import { signify } from "react-signify";

export const AppointmentSignify = signify(
  {
    packageCurrent: "",
    statusCurrent: "",
    garaCurrent: "",
  },
  {
    cache: {
      key: "sAppointmentSignify",
    },
  }
);
