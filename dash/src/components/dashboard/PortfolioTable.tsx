import { useState } from "react";
import { PortfolioProject } from "@/types/portfolio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  ExternalLink,
  Github,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioTableProps {
  projects: PortfolioProject[];
}

export function PortfolioTable({ projects }: PortfolioTableProps) {
  const [sortColumn, setSortColumn] =
    useState<keyof PortfolioProject>("updatedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const getStatusBadge = (status: PortfolioProject["status"]) => {
    const variants = {
      active: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      archived: "bg-gray-100 text-gray-800",
    };

    const labels = {
      active: "Ativo",
      completed: "Concluído",
      archived: "Arquivado",
    };

    return (
      <Badge className={cn("font-medium", variants[status])}>
        {labels[status]}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (sortDirection === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSort = (column: keyof PortfolioProject) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Projetos do Portfólio
        </CardTitle>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Projeto
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("title")}
                >
                  Projeto
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("client")}
                >
                  Cliente
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("status")}
                >
                  Status
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("progress")}
                >
                  Progresso
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("budget")}
                >
                  Orçamento
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-slate-50"
                  onClick={() => handleSort("startDate")}
                >
                  Data de Início
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-slate-50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-slate-900">
                        {project.title}
                      </div>
                      <div className="text-sm text-slate-500">
                        {project.category}
                      </div>
                      <div className="flex gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">
                      {project.client}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">
                      {formatCurrency(project.budget)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600">
                      {formatDate(project.startDate)}
                    </div>
                    {project.endDate && (
                      <div className="text-xs text-slate-400">
                        Fim: {formatDate(project.endDate)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        {project.liveUrl && (
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Ver Online
                          </DropdownMenuItem>
                        )}
                        {project.githubUrl && (
                          <DropdownMenuItem>
                            <Github className="mr-2 h-4 w-4" />
                            Ver Código
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Plus className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Nenhum projeto ainda
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Comece criando seu primeiro projeto de portfólio.
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Criar Projeto
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
