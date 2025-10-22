import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { OverviewCards } from "./OverviewCards";
import { ChartsSection } from "./ChartsSection";
import { AIInsights } from "./AIInsights";
import { TaskBoard } from "./TaskBoard";

export const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <Header sidebarCollapsed={sidebarCollapsed} />
      
      {/* Main Content */}
      <main
        className={cn(
          "pt-16 transition-all duration-300",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <div className="p-6 space-y-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, John!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your business today.
            </p>
          </div>

          {/* Overview Cards */}
          <OverviewCards />

          {/* Charts and AI Insights */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ChartsSection />
            </div>
            <div className="xl:col-span-1">
              <AIInsights />
            </div>
          </div>

          {/* Task Board */}
          <TaskBoard />
        </div>

        {/* Footer */}
        <footer className="mt-12 py-6 px-6 border-t border-border bg-muted/30">
          <div className="text-center text-sm text-muted-foreground">
            Copyright © 2025 | AI-Powered Dashboard
          </div>
        </footer>
      </main>
    </div>
  );
};
