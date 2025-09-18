"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Award, Lock, CheckCircle } from "lucide-react"
import { achievements } from "@/lib/mock-data"

export function AchievementGrid() {
  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const lockedAchievements = achievements.filter((a) => !a.unlocked)

  return (
    <div className="space-y-6">
      {/* Unlocked Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Unlocked Achievements ({unlockedAchievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-4 rounded-lg border bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                      <CheckCircle className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        +{achievement.pointsRequired} points
                      </Badge>
                      {achievement.unlockedAt && (
                        <span className="text-xs text-muted-foreground">
                          Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Locked Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
            Locked Achievements ({lockedAchievements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedAchievements.map((achievement) => {
              // Mock progress calculation
              const progress = Math.random() * 80 // Random progress for demo

              return (
                <div key={achievement.id} className="p-4 rounded-lg border bg-muted/30 border-muted">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl opacity-50">{achievement.icon}</div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-muted-foreground">{achievement.title}</h4>
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>

                      {/* Progress bar for locked achievements */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-muted-foreground">{progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={progress} className="h-1" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-muted-foreground">
                          +{achievement.pointsRequired} points
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-xs">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
