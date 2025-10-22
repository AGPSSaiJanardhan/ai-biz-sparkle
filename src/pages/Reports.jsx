import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, BarChart3, TrendingUp, Users } from "lucide-react";

const reportTypes = [
  { id: 1, name: "Monthly Performance Report", type: "Performance", lastGenerated: "2025-01-10", size: "2.4 MB", icon: BarChart3 },
  { id: 2, name: "Financial Summary Q4 2024", type: "Finance", lastGenerated: "2025-01-08", size: "1.8 MB", icon: TrendingUp },
  { id: 3, name: "Employee Analytics Report", type: "HR", lastGenerated: "2025-01-05", size: "3.2 MB", icon: Users },
  { id: 4, name: "Project Status Overview", type: "Projects", lastGenerated: "2025-01-03", size: "1.5 MB", icon: FileText },
  { id: 5, name: "Security Audit Report", type: "Security", lastGenerated: "2024-12-28", size: "4.1 MB", icon: BarChart3 },
];

const recentReports = [
  { name: "Weekly Sales Report", date: "2025-01-15", downloads: 42 },
  { name: "Customer Feedback Analysis", date: "2025-01-14", downloads: 28 },
  { name: "Inventory Status Report", date: "2025-01-12", downloads: 35 },
];

export default function Reports() {
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
                Reports
              </h1>
              <p className="text-muted-foreground">
                Generate and view comprehensive reports
              </p>
            </div>
            <Button className="gap-2">
              <FileText className="w-4 h-4" />
              Generate New Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Reports</p>
                  <p className="text-2xl font-bold">{reportTypes.length}</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-success/10 rounded-lg">
                  <Download className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Downloads This Month</p>
                  <p className="text-2xl font-bold">105</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-warning/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled Reports</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Available Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <div key={report.id} className="p-5 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{report.name}</h3>
                          <Badge variant="outline" className="text-xs">{report.type}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{report.lastGenerated}</span>
                      </div>
                      <span>{report.size}</span>
                    </div>

                    <Button variant="outline" className="w-full gap-2" size="sm">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recently Downloaded</h2>
            <div className="space-y-3">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-accent rounded-lg">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{report.name}</h3>
                      <p className="text-sm text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{report.downloads} downloads</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
