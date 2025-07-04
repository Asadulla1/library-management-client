import { useBorrowSummaryQuery } from "@/baseApi/baseApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
const BorrowSummary = () => {
  const { data, isLoading } = useBorrowSummaryQuery(undefined);
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  const summaryData = data.data;
  const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#fb7185", "#a78bfa"];
  // @ts-ignore
  const chartData = summaryData.map((item, index) => ({
    name: `${item.book.title} (${item.book.isbn})`,
    quantity: item.totalQuantity,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Borrowed Books Chart
      </h2>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={0}
            textAnchor="middle"
            height={80}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="quantity">
            {/* @ts-ignore */}
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-4 text-center text-purple-800">
          Borrowed Books List
        </h2>
        <div className="overflow-x-auto w-4/5 mx-auto">
          <table className="min-w-full  border text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Book Title</th>
                <th className="px-4 py-2 border">ISBN</th>
                <th className="px-4 py-2 border">Total Quantity Borrowed</th>
              </tr>
            </thead>
            <tbody>
              {/*  @ts-ignore */}
              {summaryData.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 border">{item.book.title}</td>
                  <td className="px-4 py-2 border">{item.book.isbn}</td>
                  <td className="px-4 py-2 border">{item.totalQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;
