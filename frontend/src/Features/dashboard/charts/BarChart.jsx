import { ResponsiveBar } from "@nivo/bar";
const data = [
  {
    "Months": "OCT",
    "Furniture": 80,
    "FurnitureColor": "hsl(158, 70%, 50%)",
    "Sunglasses": 187,
    "SunglassesColor": "hsl(99, 70%, 50%)",
    "Bags": 147,
    "BagsColor": "hsl(96, 70%, 50%)",
    "Music": 200,
    "MusicColor": "hsl(43, 70%, 50%)",
    "Electronics": 114,
    "ElectronicsColor": "hsl(86, 70%, 50%)",
    "Caps & Scarfs": 108,
    "Caps & ScarfsColor": "hsl(339, 70%, 50%)",
  },
  {
    "Months": "NOV",
    "Furniture": 200,
    "FurnitureColor": "hsl(126, 70%, 50%)",
    "Sunglasses": 60,
    "SunglassesColor": "hsl(318, 70%, 50%)",
    "Bags": 114,
    "BagsColor": "hsl(286, 70%, 50%)",
    "Music": 181,
    "MusicColor": "hsl(177, 70%, 50%)",
    "Electronics": 0,
    "ElectronicsColor": "hsl(295, 70%, 50%)",
    "Caps & Scarfs": 101,
    "Caps & ScarfsColor": "hsl(77, 70%, 50%)",
  },
  {
    "Months": "DEC",
    "Furniture": 26,
    "FurnitureColor": "hsl(254, 70%, 50%)",
    "Sunglasses": 153,
    "SunglassesColor": "hsl(337, 70%, 50%)",
    "Bags": 187,
    "BagsColor": "hsl(140, 70%, 50%)",
    "Music": 161,
    "MusicColor": "hsl(322, 70%, 50%)",
    "Electronics": 148,
    "ElectronicsColor": "hsl(323, 70%, 50%)",
    "Caps & Scarfs": 3,
    "Caps & ScarfsColor": "hsl(219, 70%, 50%)",
  },
  {
    "Months": "JAN",
    "Furniture": 81,
    "FurnitureColor": "hsl(251, 70%, 50%)",
    "Sunglasses": 187,
    "SunglassesColor": "hsl(148, 70%, 50%)",
    "Bags": 12,
    "BagsColor": "hsl(16, 70%, 50%)",
    "Music": 130,
    "MusicColor": "hsl(54, 70%, 50%)",
    "Electronics": 162,
    "ElectronicsColor": "hsl(350, 70%, 50%)",
    "Caps & Scarfs": 172,
    "Caps & ScarfsColor": "hsl(81, 70%, 50%)",
  },
  {
    "Months": "FEV",
    "Furniture": 159,
    "FurnitureColor": "hsl(25, 70%, 50%)",
    "Sunglasses": 110,
    "SunglassesColor": "hsl(293, 70%, 50%)",
    "Bags": 198,
    "BagsColor": "hsl(178, 70%, 50%)",
    "Music": 138,
    "MusicColor": "hsl(319, 70%, 50%)",
    "Electronics": 9,
    "ElectronicsColor": "hsl(299, 70%, 50%)",
    "Caps & Scarfs": 90,
    "Caps & ScarfsColor": "hsl(56, 70%, 50%)",
  },
  {
    "Months": "MAR",
    "Furniture": 178,
    "FurnitureColor": "hsl(65, 70%, 50%)",
    "Sunglasses": 28,
    "SunglassesColor": "hsl(88, 70%, 50%)",
    "Bags": 105,
    "BagsColor": "hsl(141, 70%, 50%)",
    "Music": 125,
    "MusicColor": "hsl(145, 70%, 50%)",
    "Electronics": 186,
    "ElectronicsColor": "hsl(198, 70%, 50%)",
    "Caps & Scarfs": 165,
    "Caps & ScarfsColor": "hsl(82, 70%, 50%)",
  },
  {
    "Months": "APR",
    "Furniture": 154,
    "FurnitureColor": "hsl(267, 70%, 50%)",
    "Sunglasses": 114,
    "SunglassesColor": "hsl(242, 70%, 50%)",
    "Bags": 129,
    "BagsColor": "hsl(200, 70%, 50%)",
    "Music": 21,
    "MusicColor": "hsl(246, 70%, 50%)",
    "Electronics": 188,
    "ElectronicsColor": "hsl(101, 70%, 50%)",
    "Caps & Scarfs": 188,
    "Caps & ScarfsColor": "hsl(107, 70%, 50%)",
  },
];
export const BarChart = () => (
  <ResponsiveBar
    data={data}
    keys={[
      "Furniture",
      "Sunglasses",
      "Bags",
      "Music",
      "Electronics",
      "Caps & Scarfs",
    ]}
    indexBy="Months"
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
          id: "Electronics",
        },
        id: "dots",
      },
      {
        match: {
          id: "Bags",
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
      legend: "Months",
      legendPosition: "middle",
      legendOffset: 32,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Orders",
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
      e.id + ": " + e.formattedValue + " in Months: " + e.indexValue
    }
  />
);
