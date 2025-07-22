import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { notifications } from "~/constants/data";

export const RecentNotifications = () => {
  return (
    <Card className="w-full border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="p-4 border border-border rounded-lg bg-background hover:bg-accent/50 transition-colors duration-200 cursor-pointer">
              <div className="flex items-start space-x-3">
                <div className="text-xl w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  {notification.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground/70">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
