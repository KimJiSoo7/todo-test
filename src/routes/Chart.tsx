import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "price",
              data: data?.map((price) => [
                new Date(price.time_close.slice(0, 10)), // price.volume,
                [price.open, price.high, price.low, price.close],
              ]),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              //   height: 300,
              //   width: 500,
              toolbar: {
                // autoSelected: "pan",
                show: false,
              },
              //   type: "candlesbick",
              background: "transparent",
              //   zoom: {
              //     enabled: false,
              //   },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46",
                  downward: "#3C90EB",
                },
              },
            },
            grid: { show: false },
            xaxis: {
              type: "datetime",
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
            },
            yaxis: {
              show: false,
              showAlways: false,
              tooltip: {
                enabled: true,
              },
              labels: {
                formatter: (val) => {
                  return val.toFixed(3);
                },
              },
            },
            tooltip: {
              y: {
                formatter: (val) => {
                  return val.toFixed(3);
                },
              },
            },
          }}
          //   type="line"
          //   series={[
          //     {
          //       name: "Price",
          //       data: data?.map((price) => price.close),
          //     },
          //   ]}
          //   options={{
          //     theme: {
          //       mode: "dark",
          //     },
          //     chart: {
          //       height: 300,
          //       width: 500,
          //       toolbar: {
          //         show: false,
          //       },
          //       background: "transparent",
          //     },
          //     grid: { show: false },
          //     stroke: {
          //       curve: "smooth",
          //       width: 4,
          //     },
          //     yaxis: {
          //       show: false,
          //     },
          //     xaxis: {
          //       axisBorder: { show: false },
          //       axisTicks: { show: false },
          //       labels: { show: false },
          //       type: "datetime",
          //       categories: data?.map((price) => price.time_close),
          //     },
          //     fill: {
          //       type: "gradient",
          //       gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
          //     },
          //     colors: ["#0fbcf9"],
          //     tooltip: {
          //       y: {
          //         formatter: (value) => `$${value.toFixed(2)}`,
          //       },
          //     },
          //   }}
        />
      )}
    </div>
  );
}

export default Chart;
