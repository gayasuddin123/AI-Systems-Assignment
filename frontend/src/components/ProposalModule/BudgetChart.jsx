import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#6b7280"];

const LABEL_MAP = {
  packaging: "Packaging",
  utensils: "Utensils",
  bagsAndWraps: "Bags & Wraps",
  cleaningSupplies: "Cleaning",
  officeSupplies: "Office",
  other: "Other",
};

function BudgetChart({ allocation }) {
  if (!allocation) return null;

  const data = Object.entries(allocation)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => ({
      name: LABEL_MAP[key] || key,
      value: parseFloat(value.toFixed(1)),
    }));

  if (!data.length) return null;

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">
        Budget Allocation
      </h3>
      <ResponsiveContainer width="100%" height={240} minWidth={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={80}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
            labelLine={true}
            fontSize={11}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend
            wrapperStyle={{ fontSize: "12px" }}
            layout="horizontal"
            verticalAlign="bottom"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BudgetChart;