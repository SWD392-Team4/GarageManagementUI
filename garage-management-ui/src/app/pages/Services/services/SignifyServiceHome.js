import { signify } from "react-signify";

export const sServiceHome = signify(
  {
    serviceName: "",
    carPartName: "",
    serviceCategory: "",
    category: "",
    workNature: "",
    action: "",
    search: true,
    pageNumber: 1,
  },
  {
    cache: {
      key: "sServiceHome",
    },
  }
);
