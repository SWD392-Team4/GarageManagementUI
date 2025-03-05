import { signify } from "react-signify";

export const FilterAppointment = signify(
  {
    searchNamecus: "",
    startDate: "",
    endDate: "",
    type: "",
    status: "",
  },
  {
    cache: {
      key: "filterAppointment",
    },
  }
);

//xử lý việc đưa thông tin vừa cập nhật hay tạo lên đầu table
export const sApointmentMechanic = signify(
  {
    id: "",
    customerName: "",
    customerPhone: "",
    actualAppointmentTime: "",
    estimatedEndTime: "",
    actualEndTime: "",
    status: "",

  },
  {
    cache: {
      key: "sApointmentMechanic",
    },
  }
);
