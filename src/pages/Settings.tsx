import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Shield, Palette, Globe } from "lucide-react";

export default function Settings() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

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
              Settings
            </h1>
            <p className="text-muted-foreground">
              Configure your dashboard preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Profile Settings</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Smith" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.smith@company.com" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Administrator" className="mt-1" disabled />
                </div>
                <Button className="w-full">Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Bell className="w-5 h-5 text-warning" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notif">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch 
                    id="email-notif" 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notif">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Browser push notifications</p>
                  </div>
                  <Switch 
                    id="push-notif" 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-xs text-muted-foreground">Weekly summary emails</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Security</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="2fa">Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Extra security layer</p>
                  </div>
                  <Switch 
                    id="2fa" 
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                  />
                </div>
                <Separator />
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" className="mt-1" />
                </div>
                <Button variant="outline" className="w-full">Change Password</Button>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Palette className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label>Theme</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Button variant="outline" className="justify-start">
                      Light Mode
                    </Button>
                    <Button variant="default" className="justify-start">
                      Dark Mode
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Compact View</Label>
                    <p className="text-xs text-muted-foreground">Reduce spacing</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Globe className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">Preferences</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Input id="language" defaultValue="English (US)" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input id="timezone" defaultValue="UTC-5 (Eastern Time)" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Input id="date-format" defaultValue="MM/DD/YYYY" className="mt-1" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
