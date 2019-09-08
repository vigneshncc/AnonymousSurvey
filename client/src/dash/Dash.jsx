import React, { Component } from "react";
import PieChart from "react-minimal-pie-chart";

class Dash extends Component {
  render() {
    return (
      <div>
        <PieChart
          style={{ height: "20%", width: "20%" }}
          data={[
            { title: "One", value: 10, color: "#E38627" },
            { title: "Two", value: 15, color: "#C13C37" },
            { title: "Three", value: 20, color: "#6A2135" }
          ]}
        />
      </div>
    );
  }
}
export default Dash;
