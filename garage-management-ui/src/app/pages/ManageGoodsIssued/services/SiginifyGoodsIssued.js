import { signify } from "react-signify";

export const sGoodsIssued = signify(
  {
    id: "",
    totalCost: "",
    referenceNumber: "",
    invoiceCode: "",
    status: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    cache: {
      key: "sGoodsIssued",
    },
  }
);
export const CurrentWarehouse = signify(
  {
    id: "",
  },
  {
    cache: {
      key: "CurrentWarehouse",
    },
  }
);
