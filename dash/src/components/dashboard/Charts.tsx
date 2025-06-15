import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartData } from "@/types/portfolio";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

interface ChartsProps {
  data: ChartData[];
}

export function Charts({ data }: ChartsProps) {
  // Prepare data for different chart types
  const revenueData = data.map((item) => ({
    month: item.date,
    revenue: item.revenue / 1000, // Convert to thousands
    projects: item.projects,
  }));

  const pieData = [
    { name: "Desenvolvimento Web", value: 45, color: "#3b82f6" },
    { name: "Apps Mobile", value: 30, color: "#10b981" },
    { name: "Ciência de Dados", value: 15, color: "#f59e0b" },
    { name: "UI/UX Design", value: 10, color: "#ef4444" },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Revenue Trend Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Tendência de Receita e Projetos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis
                  yAxisId="revenue"
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}k`}
                />
                <YAxis
                  yAxisId="projects"
                  orientation="right"
                  stroke="#64748b"
                  fontSize={12}
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? `R$${value}k` : value,
                    name === "revenue" ? "Receita" : "Projetos",
                  ]}
                  labelFormatter={(label) => `Mês: ${label}`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                  }}
                />
                <Line
                  yAxisId="revenue"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                />
                <Line
                  yAxisId="projects"
                  type="monotone"
                  dataKey="projects"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Revenue Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Receita Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}k`}
                />
                <Tooltip
                  formatter={(value) => [`R$${value}k`, "Receita"]}
                  labelFormatter={(label) => `Mês: ${label}`}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Project Categories Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Categorias de Projetos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Porcentagem"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
