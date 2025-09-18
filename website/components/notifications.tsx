"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Award, Target, TrendingUp, X } from "lucide-react"
import { useState } from "react"

interface Notification {
  id: string
  type: "achievement" | "milestone" | "reminder"
  title: string
  message: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "achievement",
    title: "New Achievement!",
    message: "You've unlocked the Silver Cyclist badge!",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "milestone",
    title: "Milestone Reached",
    message: "Congratulations! You've reached 125km total distance.",
    time: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "reminder",
    title: "Weekly Goal",
    message: "You're 12km away from your weekly goal of 50km!",
    time: "2 days ago",
    read: true,
  },
]

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications)

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Award className="h-4 w-4 text-secondary" />
      case "milestone":
        return <Target className="h-4 w-4 text-primary" />
      case "reminder":
        return <TrendingUp className="h-4 w-4 text-muted-foreground" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Notifications
          {notifications.filter((n) => !n.read).length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {notifications.filter((n) => !n.read).length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No new notifications</p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border transition-colors ${
                  notification.read ? "bg-muted/50 border-border" : "bg-card border-primary/20"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{notification.title}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 text-xs"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as read
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
