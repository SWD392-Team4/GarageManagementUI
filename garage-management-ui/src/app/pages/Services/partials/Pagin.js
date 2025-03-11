import React from "react";
import Pagination from "../../../components/Pagination/Pagination";
import { sServiceHome } from "../services/SignifyServiceHome";

export default function Pagin() {
  console.log("render pagi");
  return (
    <Pagination
      currentPage={sServiceHome.value.pageNumber}
      totalPages={sServiceHome.value.totalPages}
      hasPrevious={sServiceHome.value.hasPrevious}
      hasNext={sServiceHome.value.hasNext}
      onPageChange={(page) =>
        sServiceHome.set((v) => {
          v.value.pageNumber = page;
        })
      }
    />
  );
}
