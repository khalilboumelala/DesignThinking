"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Star } from "lucide-react"
import { currentStudent, getLevelProgress, getLevelColor } from "@/lib/mock-data"

export function LevelProgress() {
  const levelInfo = getLevelProgress(currentStudent.totalDistance)
  const distanceToNext = levelInfo.nextLevelDistance - currentStudent.totalDistance

  const levels = [
    { name: "Bronze", distance: 50, color: "text-amber-600", bgColor: "bg-amber-100 dark:bg-amber-900/20" },
    { name: "Silver", distance: 100, color: "text-gray-500", bgColor: "bg-gray-100 dark:bg-gray-900/20" },
    { name: "Gold", distance: 200, color: "text-yellow-500", bgColor: "bg-yellow-100 dark:bg-yellow-900/20" },
    { name: "Platinum", distance: 500, color: "text-purple-500", bgColor: "bg-purple-100 dark:bg-purple-900/20" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          Level Progression
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Level Status */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <Star className={`h-10 w-10 ${getLevelColor(levelInfo.level)}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">{levelInfo.level} Level</h3>
            <p className="text-muted-foreground">{currentStudent.totalDistance.toFixed(1)} km completed</p>
          </div>
        </div>

        {/* Progress to Next Level */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progress to {levelInfo.nextLevel}</span>
            <Badge variant="outline">{levelInfo.progress.toFixed(0)}%</Badge>
          </div>
          <Progress value={levelInfo.progress} className="h-3" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{currentStudent.totalDistance.toFixed(1)} km</span>
            <span>{distanceToNext.toFixed(1)} km to go</span>
            <span>{levelInfo.nextLevelDistance} km</span>
          </div>
        </div>

        {/* All Levels Overview */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">All Levels</h4>
          {levels.map((level, index) => {
            const isCompleted = currentStudent.totalDistance >= level.distance
            const isCurrent = levelInfo.level === level.name

            return (
              <div key={level.name} className={`flex items-center gap-3 p-3 rounded-lg ${level.bgColor}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Trophy className="h-4 w-4" /> : <Target className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${level.color}`}>{level.name}</span>
                    {isCurrent && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                    {isCompleted && !isCurrent && (
                      <Badge variant="outline" className="text-xs">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{level.distance} km required</p>
                </div>
                {isCompleted && <Star className={`h-5 w-5 ${level.color}`} />}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
