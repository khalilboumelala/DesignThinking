"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Crown, Medal, Award, TrendingUp } from "lucide-react"
import { leaderboardData, getLevelColor } from "@/lib/mock-data"

export function TopPerformers() {
  const topThree = leaderboardData.slice(0, 3)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return null
    }
  }

  const getRankGradient = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-800/30"
      case 2:
        return "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 border-gray-200 dark:border-gray-800/30"
      case 3:
        return "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-amber-200 dark:border-amber-800/30"
      default:
        return "bg-card"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Top Performers This Week
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThree.map((entry) => (
            <div key={entry.student.id} className={`relative p-6 rounded-lg border ${getRankGradient(entry.rank)}`}>
              {/* Rank Icon */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-background rounded-full p-2 border">{getRankIcon(entry.rank)}</div>
              </div>

              {/* Student Info */}
              <div className="text-center space-y-4 mt-4">
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarFallback className="text-lg font-semibold">
                    {entry.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold text-foreground">{entry.student.name}</h3>
                  <p className="text-sm text-muted-foreground">{entry.student.studentId}</p>
                </div>

                <Badge variant="outline" className={`${getLevelColor(entry.student.level)} border-current`}>
                  {entry.student.level} Level
                </Badge>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Weekly Distance</span>
                    <span className="font-semibold text-foreground">{entry.weeklyDistance.toFixed(1)} km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Weekly Points</span>
                    <span className="font-semibold text-foreground">{entry.weeklyPoints}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Distance</span>
                    <span className="font-semibold text-foreground">{entry.student.totalDistance.toFixed(1)} km</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Challenge */}
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h4 className="font-medium text-foreground">Weekly Challenge</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Can you beat Pierre Martin's weekly record of 45.2 km? You're currently at{" "}
            {leaderboardData.find((e) => e.student.name === "Marie Dubois")?.weeklyDistance.toFixed(1)} km.
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">6.5 km to go</Badge>
            <Badge variant="outline">3 days left</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
