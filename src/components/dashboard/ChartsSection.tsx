import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ChartCanvasProps {
  title: string;
  type: "bar" | "pie";
  className?: string;
}

const ChartCanvas = ({ title, type, className }: ChartCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    if (type === "bar") {
      drawBarChart(ctx, rect.width, rect.height);
    } else {
      drawPieChart(ctx, rect.width, rect.height);
    }
  }, [type]);

  const drawBarChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const data = [65, 45, 80, 35, 90, 55, 75];
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const margin = 40;
    const chartWidth = width - margin * 2;
    const chartHeight = height - margin * 2;
    const barWidth = chartWidth / data.length * 0.7;
    const maxValue = Math.max(...data);

    // Draw bars
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = margin + (chartWidth / data.length) * index + (chartWidth / data.length - barWidth) / 2;
      const y = margin + chartHeight - barHeight;

      // Create gradient
      const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
      gradient.addColorStop(0, "hsl(210, 85%, 22%)");
      gradient.addColorStop(1, "hsl(210, 75%, 35%)");

      ctx.fillStyle = gradient;
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw labels
      ctx.fillStyle = "#64748b";
      ctx.font = "12px system-ui";
      ctx.textAlign = "center";
      ctx.fillText(labels[index], x + barWidth / 2, height - 10);
    });
  };

  const drawPieChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const data = [30, 25, 20, 15, 10];
    const colors = [
      "hsl(210, 85%, 22%)",
      "hsl(200, 95%, 50%)",
      "hsl(140, 70%, 45%)",
      "hsl(45, 95%, 55%)",
      "hsl(0, 75%, 55%)"
    ];
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    const total = data.reduce((sum, value) => sum + value, 0);

    let currentAngle = -Math.PI / 2;

    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = colors[index];
      ctx.fill();
      
      currentAngle += sliceAngle;
    });
  };

  return (
    <div className={cn("bg-card p-6 rounded-xl shadow-card border border-border", className)}>
      <h3 className="text-lg font-semibold text-card-foreground mb-4">{title}</h3>
      <div className="relative w-full h-64">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCanvas title="Project Progress" type="bar" />
      <ChartCanvas title="Financial Overview" type="pie" />
    </div>
  );
};