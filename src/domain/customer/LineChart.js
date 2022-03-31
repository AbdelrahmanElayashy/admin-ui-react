import * as React from "react";
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Number of request per this day",
          data: [
            10, 41, 35, 51, 49, 62, 69, 91, 148, 11, 22, 33, 44, 55, 66, 71, 82,
            19, 14, 21, 13, 14, 15,
          ],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        markers: {
          size: 1,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          labels: {
            datetimeFormatter: {
              year: "yyyy",
              month: "MMM 'yy",
              day: "dd MMM",
              hour: "HH:mm",
            },
          },
          categories: [
            10, 41, 35, 51, 49, 62, 69, 91, 18, 1, 2, 3, 4, 5, 6, 7, 8, 9, 4, 2,
            3, 4, 5,
          ],
        },
      },
    };
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export default LineChart;
