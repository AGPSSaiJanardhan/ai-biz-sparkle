import { Search, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = ({ sidebarCollapsed }) => {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 bg-card border-b border-border z-40 transition-all duration-300",
        sidebarCollapsed ? "left-16" : "left-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search dashboard..."
              className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-foreground" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-destructive-foreground rounded-full"></span>
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-foreground">John Doe</div>
              <div className="text-xs text-muted-foreground">Administrator</div>
            </div>
            <button className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform">
              <User className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
