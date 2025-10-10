import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

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
        <div className="p-6 space-y-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Projects
            </h1>
            <p className="text-muted-foreground">
              Track and manage your ongoing projects.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <p className="text-muted-foreground">Project management content coming soon...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
