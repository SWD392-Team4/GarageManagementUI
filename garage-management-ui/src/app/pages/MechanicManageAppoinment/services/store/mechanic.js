import { signify } from "react-signify";

export const currentAppointment = signify(
  {
    appointmentDetail: "",
    load: 1,
  },
  {
    cache: {
      key: "sMechanic",
    },
  }
);
