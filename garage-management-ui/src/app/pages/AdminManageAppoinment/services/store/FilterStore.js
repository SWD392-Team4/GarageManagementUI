import { signify } from "react-signify";

export const FilterAppointment = signify(
  {
    searchNamecus: "",
    searchNameEmp: "",
    startDate: "",
    endDate: "",
    type: "",
  },
  {
    cache: {
      key: "filterPost",
    },
  }
);

//Xử lý việc create và update sẽ được hiện lên ở đầu

//List Apointment
export const sListApointment = signify(
  {
    customer: "",
    employee: "",
    type: "",
    status: "",
    expectedPrice: "",
    estimatedTime: "",
    actualTime: "",
    estimatedEnd: "",
    actualEndTime: "",
  },
  {
    cache: {
      key: "sListApointment",
    },
  }
);


// List package in apointment
export const sPackeagesInAppointment = signify(
  {
    id: "",
    namePackage: "",
    validityPeriod: "",
    timeUnit: "",
    usageLimit: "",

    usageCount: "",
    startDate: "",
    endTime: "",
    status: "",
    price: "",
  },
  {
    cache: {
      key: "sPackeagesInAppointment",
    },
  }
);


// List service in apointment
export const sServicesInAppointment = signify(
  {
    id: "",
    service: "",
    employee: "",
    estimatedEndTime: "",
    actualEndTime: "",
    price: "",
    createdTime: "",
    updateTime: "",
    status: "",
    serviceNote: "",
  },
  {
    cache: {
      key: "sServicesInAppointment",
    },
  }
);
