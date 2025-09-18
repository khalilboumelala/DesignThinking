"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Award, Target } from "lucide-react"
import { leaderboardData, currentStudent } from "@/lib/mock-data"

export function LeaderboardStats() {
  const totalStudents = leaderboardData.length
  const currentUserRank = leaderboardData.find((entry) => entry.student.id === currentStudent.id)?.rank || 0
  const averageWeeklyDistance = leaderboardData.reduce((sum, entry) => sum + entry.weeklyDistance, 0) / totalStudents
  const topPerformerPoints = leaderboardData[0]?.weeklyPoints || 0

  const stats = [
    {
      title: "Your Rank",
      value: `#${currentUserRank}`,
      description: `out of ${totalStudents} students`,
      icon: Award,
      color: "text-primary",
    },
    {
      title: "Total Students",
      value: totalStudents.toString(),
      description: "active this week",
      icon: Users,
      color: "text-chart-2",
    },
    {
      title: "Average Distance",
      value: `${averageWeeklyDistance.toFixed(1)} km`,
      description: "weekly average",
      icon: TrendingUp,
      color: "text-chart-1",
    },
    {
      title: "Top Score",
      value: `${topPerformerPoints} pts`,
      description: "this week",
      icon: Target,
      color: "text-secondary",
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
