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
export const packagePick = signify(
  {
    Packages: "",
    servicesOnPackage: "",
  },
  {
    cache: {
      key: "sPackagePick",
    },
  }
);

export const currentAppointment = signify(
  {
    status: "",
    appointmentDetails: "",
    appointmentFull: "",
    appointmentDetailPackages: "",
    load: 1,
  },
  {
    cache: {
      key: "sCurrentAppointment",
    },
  }
);
