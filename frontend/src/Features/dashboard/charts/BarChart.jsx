import { ResponsiveBar } from "@nivo/bar";
const data = [
  {
    "country": "AD",
    "hot dog": 80,
    "hot dogColor": "hsl(158, 70%, 50%)",
    "burger": 187,
    "burgerColor": "hsl(99, 70%, 50%)",
    "sandwich": 147,
    "sandwichColor": "hsl(96, 70%, 50%)",
    "kebab": 200,
    "kebabColor": "hsl(43, 70%, 50%)",
    "fries": 114,
    "friesColor": "hsl(86, 70%, 50%)",
    "donut": 108,
    "donutColor": "hsl(339, 70%, 50%)",
  },
  {
    "country": "AE",
    "hot dog": 200,
    "hot dogColor": "hsl(126, 70%, 50%)",
    "burger": 60,
    "burgerColor": "hsl(318, 70%, 50%)",
    "sandwich": 114,
    "sandwichColor": "hsl(286, 70%, 50%)",
    "kebab": 181,
    "kebabColor": "hsl(177, 70%, 50%)",
    "fries": 0,
    "friesColor": "hsl(295, 70%, 50%)",
    "donut": 101,
    "donutColor": "hsl(77, 70%, 50%)",
  },
  {
    "country": "AF",
    "hot dog": 26,
    "hot dogColor": "hsl(254, 70%, 50%)",
    "burger": 153,
    "burgerColor": "hsl(337, 70%, 50%)",
    "sandwich": 187,
    "sandwichColor": "hsl(140, 70%, 50%)",
    "kebab": 161,
    "kebabColor": "hsl(322, 70%, 50%)",
    "fries": 148,
    "friesColor": "hsl(323, 70%, 50%)",
    "donut": 3,
    "donutColor": "hsl(219, 70%, 50%)",
  },
  {
    "country": "AG",
    "hot dog": 81,
    "hot dogColor": "hsl(251, 70%, 50%)",
    "burger": 187,
    "burgerColor": "hsl(148, 70%, 50%)",
    "sandwich": 12,
    "sandwichColor": "hsl(16, 70%, 50%)",
    "kebab": 130,
    "kebabColor": "hsl(54, 70%, 50%)",
    "fries": 162,
    "friesColor": "hsl(350, 70%, 50%)",
    "donut": 172,
    "donutColor": "hsl(81, 70%, 50%)",
  },
  {
    "country": "AI",
    "hot dog": 159,
    "hot dogColor": "hsl(25, 70%, 50%)",
    "burger": 110,
    "burgerColor": "hsl(293, 70%, 50%)",
    "sandwich": 198,
    "sandwichColor": "hsl(178, 70%, 50%)",
    "kebab": 138,
    "kebabColor": "hsl(319, 70%, 50%)",
    "fries": 9,
    "friesColor": "hsl(299, 70%, 50%)",
    "donut": 90,
    "donutColor": "hsl(56, 70%, 50%)",
  },
  {
    "country": "AL",
    "hot dog": 178,
    "hot dogColor": "hsl(65, 70%, 50%)",
    "burger": 28,
    "burgerColor": "hsl(88, 70%, 50%)",
    "sandwich": 105,
    "sandwichColor": "hsl(141, 70%, 50%)",
    "kebab": 125,
    "kebabColor": "hsl(145, 70%, 50%)",
    "fries": 186,
    "friesColor": "hsl(198, 70%, 50%)",
    "donut": 165,
    "donutColor": "hsl(82, 70%, 50%)",
  },
  {
    "country": "AM",
    "hot dog": 154,
    "hot dogColor": "hsl(267, 70%, 50%)",
    "burger": 114,
    "burgerColor": "hsl(242, 70%, 50%)",
    "sandwich": 129,
    "sandwichColor": "hsl(200, 70%, 50%)",
    "kebab": 21,
    "kebabColor": "hsl(246, 70%, 50%)",
    "fries": 188,
    "friesColor": "hsl(101, 70%, 50%)",
    "donut": 188,
    "donutColor": "hsl(107, 70%, 50%)",
  },
];
export const BarChart = () => (
  <ResponsiveBar
    data={data}
    keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "fries",
        },
        id: "dots",
      },
      {
        match: {
          id: "sandwich",
        },
        id: "lines",
      },
    ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: 32,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "food",
      legendPosition: "middle",
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      e.id + ": " + e.formattedValue + " in country: " + e.indexValue
    }
  />
);
