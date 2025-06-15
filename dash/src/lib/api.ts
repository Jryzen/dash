import {
  PortfolioProject,
  DashboardStats,
  ChartData,
  Client,
  Activity,
} from "@/types/portfolio";

// Power Dash API Configuration
const API_BASE_URL = "https://juliorayser.great-site.net/backend/api";

// Detectar se estamos em ambiente de desenvolvimento
const isDevelopment =
  window.location.hostname === "localhost" ||
  window.location.hostname.includes("builder.codes") ||
  window.location.hostname.includes("127.0.0.1") ||
  window.location.port !== "";

// Helper function to make API requests (apenas para produção)
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const url = `${API_BASE_URL}/${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Mock data para desenvolvimento
function getMockProjects(): PortfolioProject[] {
  return [
    {
      id: "1",
      title: "Plataforma E-commerce",
      description:
        "Solução moderna de e-commerce em React com integração de pagamentos",
      category: "Desenvolvimento Web",
      status: "active",
      client: "TechCorp Inc.",
      startDate: "2024-01-15",
      budget: 15000,
      progress: 75,
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      imageUrl: "/placeholder.svg",
      liveUrl: "https://techcorp-ecommerce.com",
      githubUrl: "https://github.com/techcorp/ecommerce",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-20T14:30:00Z",
    },
    {
      id: "2",
      title: "App Bancário Mobile",
      description:
        "Aplicativo seguro de banco móvel com autenticação biométrica",
      category: "Desenvolvimento Mobile",
      status: "completed",
      client: "SecureBank",
      startDate: "2023-10-01",
      endDate: "2024-01-10",
      budget: 25000,
      progress: 100,
      technologies: ["React Native", "TypeScript", "Firebase", "Biometrics"],
      imageUrl: "/placeholder.svg",
      liveUrl: "https://app.securebank.com",
      createdAt: "2023-10-01T09:00:00Z",
      updatedAt: "2024-01-10T16:00:00Z",
    },
    {
      id: "3",
      title: "Dashboard de IA",
      description: "Dashboard de analytics com insights de machine learning",
      category: "Ciência de Dados",
      status: "active",
      client: "DataViz Solutions",
      startDate: "2024-02-01",
      budget: 20000,
      progress: 45,
      technologies: ["Python", "React", "TensorFlow", "D3.js"],
      imageUrl: "/placeholder.svg",
      createdAt: "2024-02-01T11:00:00Z",
      updatedAt: "2024-02-15T13:45:00Z",
    },
    {
      id: "4",
      title: "Sistema de CRM",
      description: "Sistema completo de gestão de relacionamento com cliente",
      category: "Desenvolvimento Web",
      status: "active",
      client: "StartupTech",
      startDate: "2024-01-20",
      budget: 18000,
      progress: 60,
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
      imageUrl: "/placeholder.svg",
      githubUrl: "https://github.com/startup/crm",
      createdAt: "2024-01-20T11:00:00Z",
      updatedAt: "2024-02-01T14:30:00Z",
    },
    {
      id: "5",
      title: "Loja Virtual",
      description: "E-commerce personalizado com painel administrativo",
      category: "Desenvolvimento Web",
      status: "completed",
      client: "E-Commerce Plus",
      startDate: "2023-12-01",
      endDate: "2024-01-30",
      budget: 15000,
      progress: 100,
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
      imageUrl: "/placeholder.svg",
      liveUrl: "https://ecommerce-plus.com",
      githubUrl: "https://github.com/ecommerce/store",
      createdAt: "2023-12-01T09:00:00Z",
      updatedAt: "2024-01-30T16:00:00Z",
    },
  ];
}

function getMockStats(): DashboardStats {
  return {
    totalProjects: 12,
    activeProjects: 4,
    completedProjects: 8,
    totalRevenue: 180000,
    monthlyGrowth: 15.3,
    clientSatisfaction: 4.8,
  };
}

function getMockChartData(): ChartData[] {
  return [
    { date: "2024-01", projects: 2, revenue: 25000, clients: 3 },
    { date: "2024-02", projects: 3, revenue: 35000, clients: 5 },
    { date: "2024-03", projects: 4, revenue: 45000, clients: 7 },
    { date: "2024-04", projects: 3, revenue: 40000, clients: 6 },
    { date: "2024-05", projects: 5, revenue: 55000, clients: 8 },
    { date: "2024-06", projects: 4, revenue: 50000, clients: 7 },
  ];
}

function getMockClients(): Client[] {
  return [
    {
      id: "1",
      name: "João Silva",
      email: "joao@techcorp.com",
      company: "TechCorp Inc.",
      projectsCount: 3,
      totalSpent: 45000,
      lastContact: "2024-01-20",
      status: "active",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@securebank.com",
      company: "SecureBank",
      projectsCount: 2,
      totalSpent: 35000,
      lastContact: "2024-01-15",
      status: "active",
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@dataviz.com",
      company: "DataViz Solutions",
      projectsCount: 1,
      totalSpent: 20000,
      lastContact: "2024-02-10",
      status: "active",
    },
    {
      id: "4",
      name: "Ana Oliveira",
      email: "ana@startup.com",
      company: "StartupTech",
      projectsCount: 2,
      totalSpent: 28000,
      lastContact: "2024-01-25",
      status: "active",
    },
    {
      id: "5",
      name: "Carlos Lima",
      email: "carlos@ecommerce.com",
      company: "E-Commerce Plus",
      projectsCount: 1,
      totalSpent: 15000,
      lastContact: "2024-02-05",
      status: "inactive",
    },
  ];
}

function getMockActivities(): Activity[] {
  return [
    {
      id: "1",
      type: "project_completed",
      title: "App Bancário Mobile Concluído",
      description:
        "Entrega bem-sucedida do aplicativo bancário para SecureBank",
      timestamp: "2024-01-10T16:00:00Z",
    },
    {
      id: "2",
      type: "client_added",
      title: "Novo Cliente Adicionado",
      description: "StartupTech se juntou como novo cliente",
      timestamp: "2024-02-01T10:00:00Z",
    },
    {
      id: "3",
      type: "payment_received",
      title: "Pagamento Recebido",
      description: "Recebido R$ 15.000 de pagamento da TechCorp Inc.",
      timestamp: "2024-01-25T14:30:00Z",
    },
    {
      id: "4",
      type: "project_created",
      title: "Novo Projeto Criado",
      description: "Sistema de CRM iniciado para StartupTech",
      timestamp: "2024-01-20T11:00:00Z",
    },
    {
      id: "5",
      type: "project_completed",
      title: "Loja Virtual Concluída",
      description: "E-commerce entregue com sucesso para E-Commerce Plus",
      timestamp: "2024-01-30T16:00:00Z",
    },
  ];
}

// API service functions
export const api = {
  // Projects
  getProjects: async (): Promise<PortfolioProject[]> => {
    if (isDevelopment) {
      console.log("🔧 Modo desenvolvimento: carregando projetos mock...");
      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getMockProjects();
    }

    try {
      return await apiRequest<PortfolioProject[]>("projects");
    } catch (error) {
      console.error("Error fetching projects:", error);
      return getMockProjects();
    }
  },

  getProject: async (id: string): Promise<PortfolioProject | null> => {
    if (isDevelopment) {
      console.log(`🔧 Modo desenvolvimento: carregando projeto mock ${id}...`);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const mockProjects = getMockProjects();
      return mockProjects.find((p) => p.id === id) || null;
    }

    try {
      return await apiRequest<PortfolioProject>(`projects/${id}`);
    } catch (error) {
      console.error("Error fetching project:", error);
      const mockProjects = getMockProjects();
      return mockProjects.find((p) => p.id === id) || null;
    }
  },

  createProject: async (
    project: Omit<PortfolioProject, "id" | "createdAt" | "updatedAt">,
  ): Promise<PortfolioProject> => {
    if (isDevelopment) {
      console.log("🔧 Modo desenvolvimento: criando projeto mock...");
      await new Promise((resolve) => setTimeout(resolve, 800));
      const newProject: PortfolioProject = {
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newProject;
    }

    try {
      return await apiRequest<PortfolioProject>("projects", {
        method: "POST",
        body: JSON.stringify(project),
      });
    } catch (error) {
      console.error("Error creating project:", error);
      const newProject: PortfolioProject = {
        ...project,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return newProject;
    }
  },

  updateProject: async (
    id: string,
    updates: Partial<PortfolioProject>,
  ): Promise<PortfolioProject> => {
    if (isDevelopment) {
      console.log(`🔧 Modo desenvolvimento: atualizando projeto mock ${id}...`);
      await new Promise((resolve) => setTimeout(resolve, 600));
      const mockProjects = getMockProjects();
      const project = mockProjects.find((p) => p.id === id);
      if (!project) throw new Error("Project not found");

      return {
        ...project,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    }

    try {
      return await apiRequest<PortfolioProject>(`projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.error("Error updating project:", error);
      const mockProjects = getMockProjects();
      const project = mockProjects.find((p) => p.id === id);
      if (!project) throw new Error("Project not found");

      return {
        ...project,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    if (isDevelopment) {
      console.log(`🔧 Modo desenvolvimento: deletando projeto mock ${id}...`);
      await new Promise((resolve) => setTimeout(resolve, 400));
      return;
    }

    try {
      await apiRequest<void>(`projects/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  },

  // Dashboard stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    if (isDevelopment) {
      console.log("🔧 Modo desenvolvimento: carregando estatísticas mock...");
      await new Promise((resolve) => setTimeout(resolve, 300));
      return getMockStats();
    }

    try {
      return await apiRequest<DashboardStats>("dashboard-stats");
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      return getMockStats();
    }
  },

  getChartData: async (): Promise<ChartData[]> => {
    if (isDevelopment) {
      console.log(
        "🔧 Modo desenvolvimento: carregando dados de gráfico mock...",
      );
      await new Promise((resolve) => setTimeout(resolve, 400));
      return getMockChartData();
    }

    try {
      return await apiRequest<ChartData[]>("chart-data");
    } catch (error) {
      console.error("Error fetching chart data:", error);
      return getMockChartData();
    }
  },

  // Clients
  getClients: async (): Promise<Client[]> => {
    if (isDevelopment) {
      console.log("🔧 Modo desenvolvimento: carregando clientes mock...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      return getMockClients();
    }

    try {
      return await apiRequest<Client[]>("clients");
    } catch (error) {
      console.error("Error fetching clients:", error);
      return getMockClients();
    }
  },

  // Activities
  getRecentActivities: async (): Promise<Activity[]> => {
    if (isDevelopment) {
      console.log("🔧 Modo desenvolvimento: carregando atividades mock...");
      await new Promise((resolve) => setTimeout(resolve, 300));
      return getMockActivities();
    }

    try {
      return await apiRequest<Activity[]>("activities");
    } catch (error) {
      console.error("Error fetching activities:", error);
      return getMockActivities();
    }
  },
};

// Database configuration (for reference - not used in frontend)
export const dbConfig = {
  host: "sql209.infinityfree.com",
  database: "if0_39228567_portifolio",
  domain: "juliorayser.great-site.net",
  isDevelopment,
  // Note: In production, these would be environment variables on the backend
};
