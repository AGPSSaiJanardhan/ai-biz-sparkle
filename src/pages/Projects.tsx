import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FolderKanban, Plus, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  { id: 1, name: "Website Redesign", status: "In Progress", progress: 65, deadline: "2025-03-15", team: 5, priority: "High" },
  { id: 2, name: "Mobile App Development", status: "In Progress", progress: 40, deadline: "2025-04-20", team: 8, priority: "High" },
  { id: 3, name: "Database Migration", status: "Planning", progress: 15, deadline: "2025-02-28", team: 3, priority: "Medium" },
  { id: 4, name: "API Integration", status: "Completed", progress: 100, deadline: "2025-01-10", team: 4, priority: "Low" },
  { id: 5, name: "Security Audit", status: "In Progress", progress: 80, deadline: "2025-02-05", team: 6, priority: "High" },
  { id: 6, name: "Marketing Campaign", status: "Planning", progress: 25, deadline: "2025-03-30", team: 4, priority: "Medium" },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed": return "default";
    case "In Progress": return "secondary";
    case "Planning": return "outline";
    default: return "outline";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "destructive";
    case "Medium": return "secondary";
    case "Low": return "outline";
    default: return "outline";
  }
};

export default function Projects() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      <main
        className={cn(
          "pt-16 transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Projects
              </h1>
              <p className="text-muted-foreground">
                Track and manage your ongoing projects
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FolderKanban className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Projects</p>
                  <p className="text-2xl font-bold">{projects.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <FolderKanban className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold">{projects.filter(p => p.status === "In Progress").length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-success/10 rounded-lg">
                  <FolderKanban className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{projects.filter(p => p.status === "Completed").length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <FolderKanban className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Planning</p>
                  <p className="text-2xl font-bold">{projects.filter(p => p.status === "Planning").length}</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-foreground">{project.name}</h3>
                    <Badge variant={getPriorityColor(project.priority)}>{project.priority}</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>{project.team} members</span>
                    </div>
                  </div>

                  <Badge variant={getStatusColor(project.status)} className="w-full justify-center">
                    {project.status}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
