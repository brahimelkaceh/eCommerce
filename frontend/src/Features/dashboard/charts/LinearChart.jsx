import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    "id": "japan",
    "color": "hsl(303, 70%, 50%)",
    "data": [
      {
        "x": "January",
        "y": 109,
      },
      {
        "x": "February",
        "y": 95,
      },
      {
        "x": "March",
        "y": 218,
      },
      {
        "x": "April",
        "y": 39,
      },
      {
        "x": "May",
        "y": 152,
      },
      {
        "x": "June",
        "y": 282,
      },
      {
        "x": "July",
        "y": 290,
      },
      {
        "x": "August",
        "y": 72,
      },
      {
        "x": "September",
        "y": 63,
      },
      {
        "x": "October",
        "y": 201,
      },
      {
        "x": "November",
        "y": 267,
      },
      {
        "x": "December",
        "y": 30,
      },
    ],
  },
  {
    "id": "france",
    "color": "hsl(318, 70%, 50%)",
    "data": [
      {
        "x": "January",
        "y": 100,
      },
      {
        "x": "February",
        "y": 86,
      },
      {
        "x": "March",
        "y": 44,
      },
      {
        "x": "April",
        "y": 51,
      },
      {
        "x": "May",
        "y": 111,
      },
      {
        "x": "June",
        "y": 160,
      },
      {
        "x": "July",
        "y": 138,
      },
      {
        "x": "August",
        "y": 171,
      },
      {
        "x": "September",
        "y": 183,
      },
      {
        "x": "October",
        "y": 238,
      },
      {
        "x": "November",
        "y": 101,
      },
      {
        "x": "December",
        "y": 184,
      },
    ],
  },
  {
    "id": "us",
    "color": "hsl(125, 70%, 50%)",
    "data": [
      {
        "x": "January",
        "y": 80,
      },
      {
        "x": "February",
        "y": 19,
      },
      {
        "x": "March",
        "y": 168,
      },
      {
        "x": "April",
        "y": 73,
      },
      {
        "x": "May",
        "y": 136,
      },
      {
        "x": "June",
        "y": 204,
      },
      {
        "x": "July",
        "y": 182,
      },
      {
        "x": "August",
        "y": 17,
      },
      {
        "x": "September",
        "y": 13,
      },
      {
        "x": "October",
        "y": 299,
      },
      {
        "x": "November",
        "y": 40,
      },
      {
        "x": "December",
        "y": 187,
      },
    ],
  },
  {
    "id": "germany",
    "color": "hsl(242, 70%, 50%)",
    "data": [
      {
        "x": "January",
        "y": 226,
      },
      {
        "x": "February",
        "y": 274,
      },
      {
        "x": "March",
        "y": 262,
      },
      {
        "x": "April",
        "y": 4,
      },
      {
        "x": "May",
        "y": 80,
      },
      {
        "x": "June",
        "y": 186,
      },
      {
        "x": "July",
        "y": 274,
      },
      {
        "x": "August",
        "y": 273,
      },
      {
        "x": "September",
        "y": 199,
      },
      {
        "x": "October",
        "y": 80,
      },
      {
        "x": "November",
        "y": 59,
      },
      {
        "x": "December",
        "y": 59,
      },
    ],
  },
  {
    "id": "norway",
    "color": "hsl(337, 70%, 50%)",
    "data": [
      {
        "x": "January",
        "y": 91,
      },
      {
        "x": "February",
        "y": 293,
      },
      {
        "x": "March",
        "y": 192,
      },
      {
        "x": "April",
        "y": 242,
      },
      {
        "x": "May",
        "y": 74,
      },
      {
        "x": "June",
        "y": 239,
      },
      {
        "x": "July",
        "y": 1,
      },
      {
        "x": "August",
        "y": 265,
      },
      {
        "x": "September",
        "y": 274,
      },
      {
        "x": "October",
        "y": 107,
      },
      {
        "x": "November",
        "y": 119,
      },
      {
        "x": "December",
        "y": 225,
      },
    ],
  },
];
export const LinearChart = () => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "transportation",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Earnings",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);
