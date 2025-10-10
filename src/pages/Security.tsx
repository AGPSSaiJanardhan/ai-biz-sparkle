import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle, Lock, Activity } from "lucide-react";

const securityAlerts = [
  { id: 1, type: "Critical", message: "Unusual login attempt from unknown IP address", time: "2 mins ago", status: "Active" },
  { id: 2, type: "Warning", message: "Password policy violation detected", time: "1 hour ago", status: "Reviewing" },
  { id: 3, type: "Info", message: "System security scan completed successfully", time: "3 hours ago", status: "Resolved" },
  { id: 4, type: "Warning", message: "Multiple failed login attempts detected", time: "5 hours ago", status: "Active" },
  { id: 5, type: "Info", message: "Security patch installed successfully", time: "1 day ago", status: "Resolved" },
];

const securityMetrics = [
  { label: "Firewall Status", value: "Active", icon: Shield, color: "success" },
  { label: "Last Scan", value: "3 hours ago", icon: Activity, color: "primary" },
  { label: "Threats Blocked", value: "127", icon: AlertTriangle, color: "warning" },
  { label: "Secure Connections", value: "99.8%", icon: Lock, color: "success" },
];

const getSeverityColor = (type: string) => {
  switch (type) {
    case "Critical": return "destructive";
    case "Warning": return "secondary";
    case "Info": return "outline";
    default: return "outline";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "destructive";
    case "Reviewing": return "secondary";
    case "Resolved": return "default";
    default: return "outline";
  }
};

export default function Security() {
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
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Security
            </h1>
            <p className="text-muted-foreground">
              Monitor security alerts and access controls
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {securityMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <div className={cn(
                      "p-2 rounded-lg",
                      metric.color === "success" ? "bg-success/10" :
                      metric.color === "warning" ? "bg-warning/10" :
                      "bg-primary/10"
                    )}>
                      <Icon className={cn(
                        "w-4 h-4",
                        metric.color === "success" ? "text-success" :
                        metric.color === "warning" ? "text-warning" :
                        "text-primary"
                      )} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                </Card>
              );
            })}
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Security Alerts</h2>
              <Badge variant="outline" className="gap-2">
                <Activity className="w-3 h-3" />
                Live Monitoring
              </Badge>
            </div>

            <div className="space-y-3">
              {securityAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      alert.type === "Critical" ? "bg-destructive/10" :
                      alert.type === "Warning" ? "bg-warning/10" :
                      "bg-primary/10"
                    )}>
                      {alert.type === "Critical" ? (
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      ) : alert.type === "Warning" ? (
                        <Shield className="w-5 h-5 text-warning" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-foreground">{alert.message}</h3>
                        <Badge variant={getSeverityColor(alert.type)} className="text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(alert.status)}>
                    {alert.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Access Control</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                  <span className="text-sm font-medium">Two-Factor Authentication</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                  <span className="text-sm font-medium">Password Encryption</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-accent/50 rounded-lg">
                  <span className="text-sm font-medium">Session Timeout</span>
                  <Badge variant="outline">30 minutes</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Admin login</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Security settings updated</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Backup completed</p>
                    <p className="text-xs text-muted-foreground">6 hours ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
