import React, { useState } from "react";
import { Area, Column } from "@ant-design/plots";
import { formatCurrency } from "../../../../shared/utils/format";
import { useRevenueChartData } from "../../hooks/Dashboard/useDashboardStats";
import { Spin, Segmented } from "antd";

const LargeChartCard = ({ totalRevenue }) => {
  const [frequency, setFrequency] = useState("month");
  const { data: chartResponse, isLoading } = useRevenueChartData(frequency);
  const chartData = chartResponse?.data || [];

  const isYearly = frequency === "year";

  const config = {
    data: chartData,
    xField: "label",
    yField: "revenue",
    ...(isYearly ? { colorField: "year" } : {}),
    axis: {
      y: {
        labelFormatter: (v) => {
          if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
          if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
          return v;
        },
      },
      x: {
        labelSpacing: 4,
        labelAutoRotate: true,
        labelFormatter: (v) => {
          if (!v) return "";
          if (frequency === "month") return v;
          if (frequency === "year") return v;
          if (frequency === "week") {
            const parts = v.split("-W");
            return parts.length === 2 ? `Tuần ${parts[1]}` : v;
          }
          return v;
        },
      },
    },
    tooltip: {
      channel: "y",
      valueFormatter: (v) => formatCurrency(v),
    },
    animate: { enter: { type: "fadeIn" } },
    ...(isYearly
      ? {
          legend: { position: "top" },
          columnWidthRatio: 0.6,
        }
      : {
          shapeField: "smooth",
          style: {
            fill: "linear-gradient(-90deg, #f5f3ff 0%, #7c3aed 100%)",
            fillOpacity: 0.3,
            stroke: "#7c3aed",
            lineWidth: 2,
          },
        }),
  };

  return (
    <div className="lg:col-span-2 bg-white rounded-4xl p-8 shadow-sm border border-slate-100/60 transition-all duration-300 hover:shadow-md h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <p className="text-sm text-slate-500 font-bold mb-1 uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            TỔNG DOANH THU
          </p>
          <h3 className="text-4xl font-black text-slate-900 tracking-tight">
            {formatCurrency(totalRevenue)}
          </h3>
        </div>
        <Segmented
          options={[
            { label: "Hàng tuần", value: "week" },
            { label: "Hàng tháng", value: "month" },
            { label: "Hàng năm", value: "year" },
          ]}
          value={frequency}
          onChange={setFrequency}
          className="p-1 bg-slate-50 rounded-xl"
        />
      </div>

      <div className="flex-1 min-h-[300px] w-full relative mt-4">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 rounded-xl">
            <Spin size="large" />
          </div>
        ) : chartData.length > 0 ? (
          isYearly ? (
            <Column {...config} />
          ) : (
            <Area {...config} />
          )
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
            Không có dữ liệu doanh thu
          </div>
        )}
      </div>
    </div>
  );
};
export default LargeChartCard;
