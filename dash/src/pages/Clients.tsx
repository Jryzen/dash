import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

export default function Clients() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: api.getClients,
  });

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: api.getProjects,
  });

  const filteredClients =
    clients?.filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const totalClients = filteredClients.length;
  const activeClients = filteredClients.filter(
    (c) => c.status === "active",
  ).length;
  const totalRevenue = filteredClients.reduce(
    (sum, client) => sum + client.totalSpent,
    0,
  );
  const avgSpending = totalClients > 0 ? totalRevenue / totalClients : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/4"></div>
            <div className="grid gap-4 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-slate-200 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-slate-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Clientes</h1>
            <p className="text-slate-600">
              Gerencie seus relacionamentos com clientes e projetos
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Adicionar Cliente
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total de Clientes
              </CardTitle>
              <Building className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClients}</div>
              <p className="text-xs text-muted-foreground">
                Todos os clientes registrados
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Clientes Ativos
              </CardTitle>
              <Briefcase className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeClients}</div>
              <p className="text-xs text-muted-foreground">
                Trabalhando atualmente
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Receita Total
              </CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                De todos os clientes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Gasto Médio
              </CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(avgSpending)}
              </div>
              <p className="text-xs text-muted-foreground">Média por cliente</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Buscar Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Buscar por nome, empresa ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clients Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Diretório de Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Projetos</TableHead>
                    <TableHead>Total Gasto</TableHead>
                    <TableHead>Último Contato</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id} className="hover:bg-slate-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src="/placeholder.svg"
                              alt={client.name}
                            />
                            <AvatarFallback className="text-xs">
                              {getInitials(client.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-slate-900">
                              {client.name}
                            </div>
                            <div className="text-sm text-slate-500">
                              {client.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-slate-900">
                          {client.company}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                            {client.projectsCount}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-slate-900">
                          {formatCurrency(client.totalSpent)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-slate-600">
                          {formatDate(client.lastContact)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            client.status === "active" ? "default" : "secondary"
                          }
                        >
                          {client.status === "active" ? "Ativo" : "Inativo"}
                        </Badge>
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
                              <Mail className="mr-2 h-4 w-4" />
                              Enviar Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Agendar Ligação
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Briefcase className="mr-2 h-4 w-4" />
                              Ver Projetos
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Editar Detalhes
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredClients.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Building className="h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  Nenhum cliente encontrado
                </h3>
                <p className="text-sm text-slate-500 mb-4">
                  {searchTerm
                    ? "Nenhum cliente corresponde aos seus critérios de busca."
                    : "Comece a construir sua base de clientes."}
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Seu Primeiro Cliente
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
