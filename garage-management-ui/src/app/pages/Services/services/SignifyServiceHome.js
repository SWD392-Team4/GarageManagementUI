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
    totalPages: 0,
    hasPrevious: false,
    hasNext: false,
  },
  {
    cache: {
      key: "sServiceHome",
    },
  }
);
