import React, { Component } from "react";
import C3Chart from "react-c3js";
import "c3/c3.css";

class DonutChart extends Component {
  render() {
    const data = {
      columns: [
        ["Invoice use ser,vices", 12],
        ["Invoice buy product ", 30][("Invoice buy package", 20)],
      ],
      type: "donut",
    };

    const donut = {
      title: "In-Store",
      width: 30,
      label: { show: false },
    };

    const color = {
      pattern: ["#f0f1f4", "#7a6fbe", "#28bbe3"],
    };

    const size = {
      height: 300,
    };

    return (
      <div>
        <C3Chart
          data={data}
          donut={donut}
          color={color}
          size={size}
          dir="ltr"
        />
      </div>
    );
  }
}

export default DonutChart;
