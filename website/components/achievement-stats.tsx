"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Star, Zap } from "lucide-react"
import { achievements } from "@/lib/mock-data"

export function AchievementStats() {
  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length
  const completionRate = (unlockedCount / totalCount) * 100
  const totalPointsEarned = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.pointsRequired, 0)

  const stats = [
    {
      title: "Achievements Unlocked",
      value: `${unlockedCount}/${totalCount}`,
      description: `${completionRate.toFixed(0)}% complete`,
      icon: Trophy,
      color: "text-primary",
    },
    {
      title: "Achievement Points",
      value: totalPointsEarned.toString(),
      description: "from badges",
      icon: Star,
      color: "text-secondary",
    },
    {
      title: "Current Streak",
      value: "5 days",
      description: "daily objectives",
      icon: Zap,
      color: "text-chart-1",
    },
    {
      title: "Next Milestone",
      value: "Gold Level",
      description: "72.5 km to go",
      icon: Target,
      color: "text-chart-2",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
