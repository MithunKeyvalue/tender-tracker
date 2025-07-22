import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { notifications } from "~/constants/data";

export const RecentNotifications = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="text-xl">{notification.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
