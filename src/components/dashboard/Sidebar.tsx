import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  FolderKanban, 
  DollarSign, 
  Shield, 
  FileText, 
  Settings,
  Menu,
  ChevronLeft
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: BarChart3, label: "Dashboard", active: true },
  { icon: Users, label: "Employees" },
  { icon: FolderKanban, label: "Projects" },
  { icon: DollarSign, label: "Finance" },
  { icon: Shield, label: "Security" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-sidebar-foreground font-semibold text-lg">
              AIDash
            </span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-sidebar-accent transition-colors"
        >
          {collapsed ? (
            <Menu className="w-5 h-5 text-sidebar-foreground" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-sidebar-foreground" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <button
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200",
                    item.active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-sidebar-accent rounded-lg p-3">
            <div className="text-xs text-sidebar-accent-foreground">
              <div className="font-medium">AI Status</div>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                <span>Connected</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};