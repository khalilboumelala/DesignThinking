"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Target, RefreshCw } from "lucide-react"
import { useState } from "react"

interface Objective {
  id: string
  title: string
  description: string
  target: number
  current: number
  unit: string
  points: number
  completed: boolean
  type: "distance" | "trips" | "time"
}

export function DailyObjectives() {
  const [objectives, setObjectives] = useState<Objective[]>([
    {
      id: "1",
      title: "Daily Rider",
      description: "Complete at least one bike trip today",
      target: 1,
      current: 1,
      unit: "trip",
      points: 50,
      completed: true,
      type: "trips",
    },
    {
      id: "2",
      title: "Distance Goal",
      description: "Ride at least 5km today",
      target: 5,
      current: 3.2,
      unit: "km",
      points: 100,
      completed: false,
      type: "distance",
    },
    {
      id: "3",
      title: "Time Challenge",
      description: "Spend 30 minutes cycling",
      target: 30,
      current: 18,
      unit: "min",
      points: 75,
      completed: false,
      type: "time",
    },
  ])

  const completedObjectives = objectives.filter((o) => o.completed).length
  const totalPoints = objectives.filter((o) => o.completed).reduce((sum, o) => sum + o.points, 0)

  const refreshObjectives = () => {
    // Mock refresh - in real app this would fetch new objectives
    setObjectives((prev) =>
      prev.map((obj) => ({
        ...obj,
        current: Math.random() * obj.target,
        completed: Math.random() > 0.5,
      })),
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Daily Objectives
        </CardTitle>
        <Button variant="outline" size="sm" onClick={refreshObjectives}>
          <RefreshCw className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress Summary */}
        <div className="p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Today's Progress</span>
            <Badge variant="secondary">
              {completedObjectives}/{objectives.length}
            </Badge>
          </div>
          <Progress value={(completedObjectives / objectives.length) * 100} className="h-2" />
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Points earned: {totalPoints}</span>
            <span>Bonus at 100%: +50 pts</span>
          </div>
        </div>

        {/* Objectives List */}
        <div className="space-y-3">
          {objectives.map((objective) => {
            const progress = Math.min((objective.current / objective.target) * 100, 100)

            return (
              <div key={objective.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {objective.completed ? (
                      <CheckCircle className="h-4 w-4 text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-foreground">{objective.title}</h4>
                      <Badge variant={objective.completed ? "secondary" : "outline"} className="text-xs">
                        +{objective.points} pts
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{objective.description}</p>

                    {!objective.completed && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {objective.current.toFixed(objective.unit === "km" ? 1 : 0)} / {objective.target}{" "}
                            {objective.unit}
                          </span>
                          <span className="text-muted-foreground">{progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bonus Objective */}
        <div className="p-3 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-lg border border-secondary/20">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-4 w-4 text-secondary" />
            <span className="text-sm font-medium text-foreground">Bonus Challenge</span>
            <Badge variant="outline" className="text-xs">
              +200 pts
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Complete all daily objectives to unlock tomorrow's special challenge!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
