import { Users, FolderKanban, DollarSign, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
  {
    title: "Total Employees",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: Users,
    color: "info",
  },
  {
    title: "Ongoing Projects",
    value: "23",
    change: "+3",
    changeType: "positive",
    icon: FolderKanban,
    color: "accent",
  },
  {
    title: "Monthly Revenue",
    value: "$847K",
    change: "+18%",
    changeType: "positive",
    icon: DollarSign,
    color: "success",
  },
  {
    title: "Alerts/Anomalies",
    value: "7",
    change: "-2",
    changeType: "negative",
    icon: AlertTriangle,
    color: "warning",
  },
];

export const OverviewCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-card p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center",
                  card.color === "info" && "bg-info-light",
                  card.color === "accent" && "bg-accent-light",
                  card.color === "success" && "bg-success-light",
                  card.color === "warning" && "bg-warning-light"
                )}
              >
                <Icon
                  className={cn(
                    "w-6 h-6",
                    card.color === "info" && "text-info",
                    card.color === "accent" && "text-accent",
                    card.color === "success" && "text-success",
                    card.color === "warning" && "text-warning"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-sm font-medium px-2 py-1 rounded-full",
                  card.changeType === "positive"
                    ? "text-success bg-success-light"
                    : "text-destructive bg-destructive/10"
                )}
              >
                {card.change}
              </span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-card-foreground mb-1">
                {card.value}
              </h3>
              <p className="text-sm text-muted-foreground">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
