import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Check, CheckCheck, FileText, TrendingUp, AlertCircle, Trophy, Calendar, Settings, Trash2, Archive } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "tender_match",
    title: "New Tender Match: Highway Construction",
    message: "A new tender matching your criteria has been posted by NHAI with 92% match score.",
    time: "2 hours ago",
    read: false,
    icon: TrendingUp,
    priority: "high",
    actionUrl: "/browse/tender/156",
  },
  {
    id: 2,
    type: "deadline",
    title: "Tender Deadline Approaching",
    message: "Solar Power Plant Installation tender deadline is in 3 days. Don't miss out!",
    time: "5 hours ago",
    read: false,
    icon: AlertCircle,
    priority: "urgent",
    actionUrl: "/browse/tender/045",
  },
  {
    id: 3,
    type: "contract_update",
    title: "Contract Status Updated",
    message: "Your contract 'Smart City IT Infrastructure' has been approved and is now active.",
    time: "1 day ago",
    read: true,
    icon: FileText,
    priority: "normal",
    actionUrl: "/contracts/045",
  },
  {
    id: 4,
    type: "milestone",
    title: "Milestone Achieved",
    message: "Congratulations! You've completed Phase 1 of Highway Construction Project.",
    time: "2 days ago",
    read: true,
    icon: Trophy,
    priority: "normal",
    actionUrl: "/contracts/002",
  },
  {
    id: 5,
    type: "tender_match",
    title: "5 New Tenders in Healthcare",
    message: "New tenders in your preferred category 'Healthcare' are now available.",
    time: "3 days ago",
    read: true,
    icon: Bell,
    priority: "normal",
    actionUrl: "/browse?category=healthcare",
  },
  {
    id: 6,
    type: "deadline",
    title: "Contract Renewal Due",
    message: "Your Water Treatment Plant Maintenance contract is due for renewal in 30 days.",
    time: "1 week ago",
    read: true,
    icon: Calendar,
    priority: "normal",
    actionUrl: "/contracts/112",
  },
];

const notificationTypes = [
  { id: "all", label: "All", count: mockNotifications.length },
  { id: "tender_match", label: "Tender Matches", count: 2 },
  { id: "deadline", label: "Deadlines", count: 2 },
  { id: "contract_update", label: "Contract Updates", count: 1 },
  { id: "milestone", label: "Milestones", count: 1 },
];

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedType, setSelectedType] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "high":
        return "bg-chart-5/10 text-chart-5 border-chart-5/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    const matchesType = selectedType === "all" || notif.type === selectedType;
    const matchesUnread = !showUnreadOnly || !notif.read;
    return matchesType && matchesUnread;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className={showUnreadOnly ? "bg-primary text-primary-foreground" : "border-border hover:bg-accent"}
          >
            {showUnreadOnly ? <Bell className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
            {showUnreadOnly ? "Unread Only" : "All Notifications"}
          </Button>
          <Button
            variant="outline"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="border-border hover:bg-accent"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" className="border-border hover:bg-accent">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Notification Types */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {notificationTypes.map((type) => (
              <Button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                variant={selectedType === type.id ? "default" : "secondary"}
                size="default"
                className="font-medium"
              >
                {type.label}
                <Badge variant="secondary" className="ml-2 bg-background">
                  {type.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="p-12 text-center">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications to show</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-border bg-card hover:shadow-lg transition-all duration-300 ${
                !notification.read ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    !notification.read ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <notification.icon className={`w-6 h-6 ${
                      !notification.read ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold ${
                          !notification.read ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {notification.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <Badge className={getPriorityColor(notification.priority)}>
                        {notification.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="hover:bg-accent"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Mark Read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-accent"
                        >
                          <Archive className="w-4 h-4 mr-1" />
                          Archive
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        {notification.actionUrl && (
                          <Button
                            size="sm"
                            variant="gradient"
                          >
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};