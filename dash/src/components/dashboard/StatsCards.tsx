import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardStats } from "@/types/portfolio";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const statsData = [
    {
      title: "Total de Projetos",
      value: stats.totalProjects.toString(),
      icon: Briefcase,
      change: "+12%",
      changeType: "positive" as const,
      description: "do mês passado",
    },
    {
      title: "Projetos Ativos",
      value: stats.activeProjects.toString(),
      icon: Clock,
      change: "+8%",
      changeType: "positive" as const,
      description: "em andamento",
    },
    {
      title: "Projetos Concluídos",
      value: stats.completedProjects.toString(),
      icon: CheckCircle,
      change: "+15%",
      changeType: "positive" as const,
      description: "entregues com sucesso",
    },
    {
      title: "Receita Total",
      value: `R$${(stats.totalRevenue / 1000).toFixed(0)}k`,
      icon: DollarSign,
      change: `+${stats.monthlyGrowth.toFixed(1)}%`,
      changeType: "positive" as const,
      description: "do mês passado",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {stat.title}
            </CardTitle>
            <div className="rounded-full bg-blue-50 p-2">
              <stat.icon className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {stat.value}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div
                className={cn(
                  "flex items-center gap-1",
                  stat.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600",
                )}
              >
                {stat.changeType === "positive" ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change}
              </div>
              <span>{stat.description}</span>
            </div>
          </CardContent>
          <div
            className={cn(
              "absolute bottom-0 left-0 h-1 w-full",
              stat.changeType === "positive" ? "bg-green-500" : "bg-red-500",
            )}
          />
        </Card>
      ))}
    </div>
  );
}
