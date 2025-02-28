import { signify } from "react-signify";

export const sAccount = signify(
  {
    Id: "",
    FirstName: "",
    LastName: "",
    ImageLink: "",
    Email: "",
    PhoneNumber: "",
    Gender: null,
    CitizenIdentification: "",
    DateOfBirth: "",
    Status: "",
    WorkPlaceId: "",
    CreatedAt: "",
    UpdatedAt: "",
    Role: "",
  },
  {
    cache: {
      key: "User",
    },
  }
);
