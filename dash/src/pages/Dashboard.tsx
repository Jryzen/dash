import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { Charts } from "@/components/dashboard/Charts";
import { PortfolioTable } from "@/components/dashboard/PortfolioTable";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: api.getDashboardStats,
  });

  const { data: chartData, isLoading: chartLoading } = useQuery({
    queryKey: ["chart-data"],
    queryFn: api.getChartData,
  });

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: api.getProjects,
  });

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["recent-activities"],
    queryFn: api.getRecentActivities,
  });

  if (statsLoading || chartLoading || projectsLoading || activitiesLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-6 p-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="lg:col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-80 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600">
              Bem-vindo de volta! Aqui está uma visão geral do desempenho do seu
              portfólio.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && <StatsCards stats={stats} />}

        {/* Charts */}
        {chartData && (
          <div className="space-y-6">
            <Charts data={chartData} />
          </div>
        )}

        {/* Bottom Section - Projects and Activity */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {projects && <PortfolioTable projects={projects.slice(0, 5)} />}
          </div>
          <div>{activities && <RecentActivity activities={activities} />}</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
