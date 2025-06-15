import { Activity } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckCircle,
  UserPlus,
  DollarSign,
  Briefcase,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    const iconMap = {
      project_created: Briefcase,
      project_completed: CheckCircle,
      client_added: UserPlus,
      payment_received: DollarSign,
    };

    return iconMap[type] || Clock;
  };

  const getActivityColor = (type: Activity["type"]) => {
    const colorMap = {
      project_created: "text-blue-600 bg-blue-100",
      project_completed: "text-green-600 bg-green-100",
      client_added: "text-purple-600 bg-purple-100",
      payment_received: "text-emerald-600 bg-emerald-100",
    };

    return colorMap[type] || "text-gray-600 bg-gray-100";
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMilliseconds = now.getTime() - activityTime.getTime();
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} dia${diffInDays > 1 ? "s" : ""} atrás`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hora${diffInHours > 1 ? "s" : ""} atrás`;
    } else {
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      return `${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""} atrás`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Atividades Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type);
            const colorClasses = getActivityColor(activity.type);

            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    colorClasses,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatTimestamp(activity.timestamp)}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}

          {activities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="h-8 w-8 text-slate-400 mb-2" />
              <p className="text-sm text-slate-500">
                Nenhuma atividade recente
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
