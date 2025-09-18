"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Target, Calendar, MapPin } from "lucide-react"
import { currentStudent } from "@/lib/mock-data"

interface Milestone {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  type: "distance" | "trips" | "points"
  deadline?: string
  completed: boolean
}

export function MilestoneTracker() {
  const milestones: Milestone[] = [
    {
      id: "1",
      title: "Century Rider",
      description: "Complete 100km total distance",
      target: 100,
      current: currentStudent.totalDistance,
      unit: "km",
      type: "distance",
      completed: currentStudent.totalDistance >= 100,
    },
    {
      id: "2",
      title: "Weekly Warrior",
      description: "Complete 10 trips this month",
      target: 10,
      current: 7,
      unit: "trips",
      type: "trips",
      deadline: "End of January",
      completed: false,
    },
    {
      id: "3",
      title: "Point Collector",
      description: "Earn 1500 quittus points",
      target: 1500,
      current: currentStudent.totalPoints,
      unit: "points",
      type: "points",
      completed: currentStudent.totalPoints >= 1500,
    },
    {
      id: "4",
      title: "Distance Master",
      description: "Reach 200km total distance",
      target: 200,
      current: currentStudent.totalDistance,
      unit: "km",
      type: "distance",
      deadline: "End of February",
      completed: false,
    },
    {
      id: "5",
      title: "Consistency King",
      description: "Ride 5 days in a row",
      target: 5,
      current: 3,
      unit: "days",
      type: "trips",
      completed: false,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "distance":
        return <MapPin className="h-4 w-4" />
      case "trips":
        return <Calendar className="h-4 w-4" />
      case "points":
        return <Target className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "distance":
        return "text-chart-1"
      case "trips":
        return "text-chart-2"
      case "points":
        return "text-secondary"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Milestone Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {milestones.map((milestone) => {
            const progress = Math.min((milestone.current / milestone.target) * 100, 100)
            const remaining = Math.max(milestone.target - milestone.current, 0)

            return (
              <div key={milestone.id} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {milestone.completed ? (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{milestone.title}</h4>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${getTypeColor(milestone.type)}`}>{getIcon(milestone.type)}</div>
                        {milestone.completed ? (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            {remaining.toFixed(milestone.unit === "km" ? 1 : 0)} {milestone.unit} to go
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {milestone.current.toFixed(milestone.unit === "km" ? 1 : 0)} / {milestone.target}{" "}
                          {milestone.unit}
                        </span>
                        <span className="font-medium">{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    {milestone.deadline && !milestone.completed && (
                      <p className="text-xs text-muted-foreground">Deadline: {milestone.deadline}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
