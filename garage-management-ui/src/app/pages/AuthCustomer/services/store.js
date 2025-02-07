import { signify } from "react-signify";

export const sAccount = signify(
  {
    Id: "",
    FirstName: "",
    LastName: "",
    Image: "",
    Email: "",
    PhoneNumber: "",
    Gender: null,
    CitizenIdentification: "",
    DateOfBirth: "",
    Status: "",
    WorkPlaceId: "",
    CreatedAt: "",
    UpdatedAt: "",
  },
  {
    cache: {
      key: "User",
    },
  }
);
