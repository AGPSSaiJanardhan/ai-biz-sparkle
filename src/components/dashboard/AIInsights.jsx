import { useState, useEffect } from "react";
import { Brain, TrendingUp, AlertCircle, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const insights = [
  {
    icon: TrendingUp,
    title: "Revenue Forecast",
    message: "Revenue forecast for next month: +12% based on current trends and seasonal patterns.",
    type: "positive",
  },
  {
    icon: AlertCircle,
    title: "Project Risk Analysis",
    message: "Project X has a 78% chance of delay due to resource constraints and dependency issues.",
    type: "warning",
  },
  {
    icon: Target,
    title: "Performance Optimization",
    message: "Employee productivity increased by 15% after implementing AI-powered task allocation.",
    type: "info",
  },
  {
    icon: Brain,
    title: "Predictive Analytics",
    message: "Market analysis suggests launching Product Y in Q2 for optimal customer adoption.",
    type: "positive",
  },
  {
    icon: AlertCircle,
    title: "Security Alert",
    message: "Detected unusual login patterns. Recommend enabling additional 2FA for 12 accounts.",
    type: "warning",
  },
  {
    icon: TrendingUp,
    title: "Growth Opportunity",
    message: "Customer retention can improve by 23% with personalized engagement strategies.",
    type: "positive",
  },
];

export const AIInsights = () => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const insight = insights[currentInsight];
  const Icon = insight.icon;

  return (
    <div className="bg-card p-6 rounded-xl shadow-card border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">AI Insights</h3>
          <p className="text-sm text-muted-foreground">Real-time intelligence</p>
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
        )}
      >
        <div className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
              insight.type === "positive" && "bg-success-light",
              insight.type === "warning" && "bg-warning-light",
              insight.type === "info" && "bg-info-light"
            )}
          >
            <Icon
              className={cn(
                "w-4 h-4",
                insight.type === "positive" && "text-success",
                insight.type === "warning" && "text-warning",
                insight.type === "info" && "text-info"
              )}
            />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-card-foreground mb-1">{insight.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{insight.message}</p>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex space-x-1 mt-4">
        {insights.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1 rounded-full transition-all duration-300",
              index === currentInsight ? "bg-primary flex-1" : "bg-muted w-2"
            )}
          />
        ))}
      </div>
    </div>
  );
};
