import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  { id: 1, type: "Income", description: "Client Payment - Project Alpha", amount: 45000, date: "2025-01-15", status: "Completed" },
  { id: 2, type: "Expense", description: "Office Rent", amount: -8500, date: "2025-01-14", status: "Completed" },
  { id: 3, type: "Income", description: "Subscription Revenue", amount: 12300, date: "2025-01-13", status: "Completed" },
  { id: 4, type: "Expense", description: "Software Licenses", amount: -3200, date: "2025-01-12", status: "Completed" },
  { id: 5, type: "Income", description: "Consulting Service", amount: 28000, date: "2025-01-10", status: "Completed" },
  { id: 6, type: "Expense", description: "Marketing Campaign", amount: -5600, date: "2025-01-09", status: "Pending" },
];

export default function Finance() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const totalIncome = transactions.filter(t => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = Math.abs(transactions.filter(t => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0));
  const netProfit = totalIncome - totalExpense;

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
              Finance
            </h1>
            <p className="text-muted-foreground">
              View financial reports and analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <div className="p-2 bg-success/10 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-success" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">${totalIncome.toLocaleString()}</p>
              <p className="text-xs text-success flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3" />
                +12.5% from last month
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">${totalExpense.toLocaleString()}</p>
              <p className="text-xs text-destructive flex items-center gap-1 mt-2">
                <ArrowDownRight className="w-3 h-3" />
                +8.2% from last month
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">${netProfit.toLocaleString()}</p>
              <p className="text-xs text-success flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3" />
                +15.8% from last month
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Profit Margin</p>
                <div className="p-2 bg-warning/10 rounded-lg">
                  <CreditCard className="w-4 h-4 text-warning" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{((netProfit / totalIncome) * 100).toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-2">Target: 35%</p>
            </Card>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-lg",
                      transaction.type === "Income" ? "bg-success/10" : "bg-destructive/10"
                    )}>
                      {transaction.type === "Income" ? (
                        <ArrowUpRight className={cn("w-5 h-5", "text-success")} />
                      ) : (
                        <ArrowDownRight className={cn("w-5 h-5", "text-destructive")} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{transaction.description}</h3>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-lg font-bold",
                      transaction.amount > 0 ? "text-success" : "text-destructive"
                    )}>
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.status}</p>
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
