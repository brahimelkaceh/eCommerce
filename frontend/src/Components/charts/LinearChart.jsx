import { ResponsiveLine } from "@nivo/line";
const data = [
  {
    "id": "japan",
    "color": "hsl(303, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 109,
      },
      {
        "x": "helicopter",
        "y": 95,
      },
      {
        "x": "boat",
        "y": 218,
      },
      {
        "x": "train",
        "y": 39,
      },
      {
        "x": "subway",
        "y": 152,
      },
      {
        "x": "bus",
        "y": 282,
      },
      {
        "x": "car",
        "y": 290,
      },
      {
        "x": "moto",
        "y": 72,
      },
      {
        "x": "bicycle",
        "y": 63,
      },
      {
        "x": "horse",
        "y": 201,
      },
      {
        "x": "skateboard",
        "y": 267,
      },
      {
        "x": "others",
        "y": 30,
      },
    ],
  },
  {
    "id": "france",
    "color": "hsl(318, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 100,
      },
      {
        "x": "helicopter",
        "y": 86,
      },
      {
        "x": "boat",
        "y": 44,
      },
      {
        "x": "train",
        "y": 51,
      },
      {
        "x": "subway",
        "y": 111,
      },
      {
        "x": "bus",
        "y": 160,
      },
      {
        "x": "car",
        "y": 138,
      },
      {
        "x": "moto",
        "y": 171,
      },
      {
        "x": "bicycle",
        "y": 183,
      },
      {
        "x": "horse",
        "y": 238,
      },
      {
        "x": "skateboard",
        "y": 101,
      },
      {
        "x": "others",
        "y": 184,
      },
    ],
  },
  {
    "id": "us",
    "color": "hsl(125, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 80,
      },
      {
        "x": "helicopter",
        "y": 19,
      },
      {
        "x": "boat",
        "y": 168,
      },
      {
        "x": "train",
        "y": 73,
      },
      {
        "x": "subway",
        "y": 136,
      },
      {
        "x": "bus",
        "y": 204,
      },
      {
        "x": "car",
        "y": 182,
      },
      {
        "x": "moto",
        "y": 17,
      },
      {
        "x": "bicycle",
        "y": 13,
      },
      {
        "x": "horse",
        "y": 299,
      },
      {
        "x": "skateboard",
        "y": 40,
      },
      {
        "x": "others",
        "y": 187,
      },
    ],
  },
  {
    "id": "germany",
    "color": "hsl(242, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 226,
      },
      {
        "x": "helicopter",
        "y": 274,
      },
      {
        "x": "boat",
        "y": 262,
      },
      {
        "x": "train",
        "y": 4,
      },
      {
        "x": "subway",
        "y": 80,
      },
      {
        "x": "bus",
        "y": 186,
      },
      {
        "x": "car",
        "y": 274,
      },
      {
        "x": "moto",
        "y": 273,
      },
      {
        "x": "bicycle",
        "y": 199,
      },
      {
        "x": "horse",
        "y": 80,
      },
      {
        "x": "skateboard",
        "y": 59,
      },
      {
        "x": "others",
        "y": 59,
      },
    ],
  },
  {
    "id": "norway",
    "color": "hsl(337, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 91,
      },
      {
        "x": "helicopter",
        "y": 293,
      },
      {
        "x": "boat",
        "y": 192,
      },
      {
        "x": "train",
        "y": 242,
      },
      {
        "x": "subway",
        "y": 74,
      },
      {
        "x": "bus",
        "y": 239,
      },
      {
        "x": "car",
        "y": 1,
      },
      {
        "x": "moto",
        "y": 265,
      },
      {
        "x": "bicycle",
        "y": 274,
      },
      {
        "x": "horse",
        "y": 107,
      },
      {
        "x": "skateboard",
        "y": 119,
      },
      {
        "x": "others",
        "y": 225,
      },
    ],
  },
];
const LinearChart = () => (
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
      legend: "count",
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

export default LinearChart;
