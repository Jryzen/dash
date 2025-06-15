import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Charts } from "@/components/dashboard/Charts";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, TrendingUp, Users, DollarSign } from "lucide-react";
import { useState } from "react";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6m");

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: api.getDashboardStats,
  });

  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ["chart-data", timeRange],
    queryFn: api.getChartData,
  });

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: api.getProjects,
  });

  if (statsLoading || chartLoading || projectsLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-slate-200 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-slate-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Calculate additional analytics
  const totalRevenue =
    projects?.reduce((sum, project) => sum + project.budget, 0) || 0;
  const completedProjects =
    projects?.filter((p) => p.status === "completed") || [];
  const activeProjects = projects?.filter((p) => p.status === "active") || [];
  const uniqueClients = [...new Set(projects?.map((p) => p.client) || [])];

  const avgProjectValue = projects?.length ? totalRevenue / projects.length : 0;
  const completionRate = projects?.length
    ? (completedProjects.length / projects.length) * 100
    : 0;
  const avgProjectDuration =
    completedProjects.length > 0
      ? completedProjects.reduce((sum, project) => {
          const start = new Date(project.startDate);
          const end = new Date(project.endDate!);
          return (
            sum +
            Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
          );
        }, 0) / completedProjects.length
      : 0;

  const keyMetrics = [
    {
      title: "Taxa de Conclusão",
      value: `${completionRate.toFixed(1)}%`,
      icon: TrendingUp,
      description: "Projetos concluídos com sucesso",
      trend: "+5.2%",
    },
    {
      title: "Valor Médio por Projeto",
      value: `R$${(avgProjectValue / 1000).toFixed(0)}k`,
      icon: DollarSign,
      description: "Orçamento médio dos projetos",
      trend: "+12.3%",
    },
    {
      title: "Clientes Únicos",
      value: uniqueClients.length.toString(),
      icon: Users,
      description: "Número total de clientes",
      trend: "+8.1%",
    },
    {
      title: "Duração Média",
      value: `${Math.round(avgProjectDuration)} dias`,
      icon: CalendarDays,
      description: "Tempo médio de conclusão",
      trend: "-3.2%",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
            <p className="text-slate-600">
              Insights detalhados sobre o desempenho do seu portfólio
            </p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last month</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Overview Stats */}
        {stats && <StatsCards stats={stats} />}

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {keyMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {metric.title}
                </CardTitle>
                <div className="rounded-full bg-blue-50 p-2">
                  <metric.icon className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">
                  {metric.value}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Badge
                    variant={
                      metric.trend.startsWith("+") ? "default" : "secondary"
                    }
                    className="text-xs"
                  >
                    {metric.trend}
                  </Badge>
                  <span>{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        {chartData && (
          <div className="space-y-6">
            <Charts data={chartData} />
          </div>
        )}

        {/* Performance Insights */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Distribuição de Status dos Projetos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Projetos Ativos
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{
                              width: `${(stats.activeProjects / stats.totalProjects) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">
                          {stats.activeProjects}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Projetos Concluídos
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{
                              width: `${(stats.completedProjects / stats.totalProjects) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">
                          {stats.completedProjects}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Projetos Arquivados
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gray-500 rounded-full"
                            style={{
                              width: `${((stats.totalProjects - stats.activeProjects - stats.completedProjects) / stats.totalProjects) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-slate-600">
                          {stats.totalProjects -
                            stats.activeProjects -
                            stats.completedProjects}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Distribuição de Tecnologias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects &&
                  (() => {
                    const techCount = projects.reduce(
                      (acc, project) => {
                        project.technologies.forEach((tech) => {
                          acc[tech] = (acc[tech] || 0) + 1;
                        });
                        return acc;
                      },
                      {} as Record<string, number>,
                    );

                    const topTechs = Object.entries(techCount)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 5);

                    const maxCount = Math.max(
                      ...topTechs.map(([, count]) => count),
                    );

                    return topTechs.map(([tech, count]) => (
                      <div
                        key={tech}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">{tech}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-purple-500 rounded-full"
                              style={{ width: `${(count / maxCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-slate-600 w-6 text-right">
                            {count}
                          </span>
                        </div>
                      </div>
                    ));
                  })()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
