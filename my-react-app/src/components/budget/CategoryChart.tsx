import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { $36EnumsRecurrence } from "../../redux/api/endpoints/calculatingParrotApi";
import { useState } from "react";

type LineItem = {
  category: {
    name: string;
  };
  amount: number;
  recurrence: $36EnumsRecurrence;
};

type CategoryChartProps = {
  lineItems: LineItem[];
};

const getAmount = (
  amount: number,
  recurrence: $36EnumsRecurrence,
  view: string
) => {
  const multipliers: Record<string, Record<$36EnumsRecurrence, number>> = {
    MONTHLY: {
      DAILY: 365 / 12,
      WEEKLY: 52 / 12,
      MONTHLY: 1,
      YEARLY: 1 / 12,
      ONCE: 1 / 12,
    },
    WEEKLY: {
      DAILY: 7,
      WEEKLY: 1,
      MONTHLY: 1 / 4,
      YEARLY: 1 / 52,
      ONCE: 1 / 52,
    },
    YEARLY: {
      DAILY: 365,
      WEEKLY: 52,
      MONTHLY: 12,
      YEARLY: 1,
      ONCE: 1,
    },
  };

  return amount * (multipliers[view][recurrence] || 0);
};

export function CategoryChart({ lineItems }: CategoryChartProps) {
  const [view, setView] = useState("MONTHLY");

  const data = lineItems.reduce((acc, lineItem) => {
    const category = lineItem.category.name;
    const amount = getAmount(lineItem.amount, lineItem.recurrence, view);

    if (!acc[category]) {
      acc[category] = { category, amount: 0 };
    }

    acc[category].amount += amount;
    return acc;
  }, {} as Record<string, { category: string; amount: number }>);

  const chartData = Object.values(data);

  return (
    <div>
      <div className="flex justify-center bg-white shadow-md mb-4 rounded-t-3xl">
        <button
          className={`px-4 py-2 mx-2 my-4 rounded-3xl ${
            view === "WEEKLY" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("WEEKLY")}
        >
          Weekly
        </button>
        <button
          className={`px-4 py-2 mx-2 my-4 rounded-3xl ${
            view === "MONTHLY" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("MONTHLY")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 mx-2 my-4 rounded-3xl ${
            view === "YEARLY" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("YEARLY")}
        >
          Yearly
        </button>
      </div>
      <ResponsiveContainer
        width="100%"
        height={400}
        className={"bg-white pt-4 rounded-b-3xl shadow-md"}
      >
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip formatter={(value: number) => value.toFixed(0)} />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.amount > 0 ? "#82ca9d" : "#ff4d4d"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
