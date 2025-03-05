import { signify } from "react-signify";

export const sAccount = signify(
  {
    id: "",
    firstName: "",
    lastName: "",
    imageLink: "",
    email: "",
    phoneNumber: "",
    gender: null,
    citizenIdentification: "",
    dateOfBirth: "",
    status: "",
    workPlaceId: "",
    createdAt: "",
    updatedAt: "",
    role: "",
  },
  {
    cache: {
      key: "sAccount",
    },
  }
);
