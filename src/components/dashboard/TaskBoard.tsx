import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, MoreVertical } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
  color: string;
}

const initialData: Column[] = [
  {
    id: "todo",
    title: "To Do",
    color: "muted",
    tasks: [
      {
        id: "1",
        title: "Design System Update",
        description: "Update the design system components",
        priority: "high",
        assignee: "JD",
      },
      {
        id: "2",
        title: "Database Migration",
        description: "Migrate legacy data to new schema",
        priority: "medium",
        assignee: "AS",
      },
    ],
  },
  {
    id: "progress",
    title: "In Progress",
    color: "info",
    tasks: [
      {
        id: "3",
        title: "API Integration",
        description: "Integrate third-party payment API",
        priority: "high",
        assignee: "MR",
      },
      {
        id: "4",
        title: "User Testing",
        description: "Conduct usability testing session",
        priority: "low",
        assignee: "SK",
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    color: "success",
    tasks: [
      {
        id: "5",
        title: "Security Audit",
        description: "Complete quarterly security review",
        priority: "high",
        assignee: "RJ",
      },
    ],
  },
];

export const TaskBoard = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    
    if (!draggedTask || !draggedFrom || draggedFrom === targetColumnId) {
      setDraggedTask(null);
      setDraggedFrom(null);
      return;
    }

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.id === draggedFrom) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== draggedTask.id),
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, draggedTask],
          };
        }
        return column;
      });
      return newColumns;
    });

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 text-destructive";
      case "medium":
        return "bg-warning/10 text-warning";
      case "low":
        return "bg-success/10 text-success";
    }
  };

  return (
    <div className="bg-card p-6 rounded-xl shadow-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Task Board</h3>
        <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-light transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className="bg-muted/30 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-foreground flex items-center space-x-2">
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    column.color === "muted" && "bg-muted-foreground",
                    column.color === "info" && "bg-info",
                    column.color === "success" && "bg-success"
                  )}
                />
                <span>{column.title}</span>
                <span className="text-xs text-muted-foreground">({column.tasks.length})</span>
              </h4>
              <button className="p-1 rounded hover:bg-muted transition-colors">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                  className="bg-card p-4 rounded-lg shadow-sm border border-border cursor-move hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-card-foreground text-sm">{task.title}</h5>
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium",
                        getPriorityColor(task.priority)
                      )}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-xs font-medium text-primary-foreground">
                      {task.assignee}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      2 days ago
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};