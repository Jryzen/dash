export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "completed" | "archived";
  client: string;
  startDate: string;
  endDate?: string;
  budget: number;
  progress: number;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalRevenue: number;
  monthlyGrowth: number;
  clientSatisfaction: number;
}

export interface ChartData {
  date: string;
  projects: number;
  revenue: number;
  clients: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  projectsCount: number;
  totalSpent: number;
  lastContact: string;
  status: "active" | "inactive";
}

export interface Activity {
  id: string;
  type:
    | "project_created"
    | "project_completed"
    | "client_added"
    | "payment_received";
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, any>;
}
