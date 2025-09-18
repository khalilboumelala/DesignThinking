"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Target, TrendingUp, Edit } from "lucide-react"

export function MonthlyGoals() {
  const monthlyGoals = [
    {
      id: "1",
      title: "Distance Goal",
      target: 80,
      current: 52.3,
      unit: "km",
      icon: TrendingUp,
      color: "text-chart-1",
    },
    {
      id: "2",
      title: "Trip Goal",
      target: 15,
      current: 8,
      unit: "trips",
      icon: Calendar,
      color: "text-chart-2",
    },
    {
      id: "3",
      title: "Points Goal",
      target: 800,
      current: 523,
      unit: "points",
      icon: Target,
      color: "text-secondary",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          January Goals
        </CardTitle>
        <Button variant="outline" size="sm">
          <Edit className="h-3 w-3 mr-1" />
          Edit Goals
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {monthlyGoals.map((goal) => {
          const Icon = goal.icon
          const progress = Math.min((goal.current / goal.target) * 100, 100)
          const remaining = Math.max(goal.target - goal.current, 0)
          const isCompleted = goal.current >= goal.target

          return (
            <div key={goal.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${goal.color}`} />
                  <span className="font-medium text-foreground">{goal.title}</span>
                </div>
                {isCompleted ? (
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Completed!
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    {remaining.toFixed(goal.unit === "km" ? 1 : 0)} {goal.unit} left
                  </Badge>
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {goal.current.toFixed(goal.unit === "km" ? 1 : 0)} / {goal.target} {goal.unit}
                  </span>
                  <span className="font-medium">{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          )
        })}

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-medium">67%</span>
          </div>
          <Progress value={67} className="h-2 mt-1" />
          <p className="text-xs text-muted-foreground mt-2">
            Great progress! You're on track to meet your monthly goals.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
