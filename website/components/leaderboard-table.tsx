"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, Crown } from "lucide-react"
import { leaderboardData, currentStudent, getLevelColor } from "@/lib/mock-data"

export function LeaderboardTable() {
  const [timeFilter, setTimeFilter] = useState("weekly")
  const [sortBy, setSortBy] = useState("points")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case 2:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      case 3:
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Rankings
          </CardTitle>

          <div className="flex items-center gap-2">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">This Week</SelectItem>
                <SelectItem value="monthly">This Month</SelectItem>
                <SelectItem value="alltime">All Time</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="points">Points</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
                <SelectItem value="trips">Trips</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((entry) => {
            const isCurrentUser = entry.student.id === currentStudent.id

            return (
              <div
                key={entry.student.id}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
                  isCurrentUser ? "bg-primary/5 border-primary/20" : "bg-card hover:bg-muted/50"
                }`}
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12">{getRankIcon(entry.rank)}</div>

                {/* Student Info */}
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="text-sm font-semibold">
                      {entry.student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{entry.student.name}</h4>
                      {isCurrentUser && (
                        <Badge variant="secondary" className="text-xs">
                          You
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.student.studentId}</p>
                  </div>
                </div>

                {/* Level Badge */}
                <Badge variant="outline" className={`${getLevelColor(entry.student.level)} border-current`}>
                  {entry.student.level}
                </Badge>

                {/* Stats */}
                <div className="hidden sm:flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{entry.weeklyDistance.toFixed(1)}</div>
                    <div className="text-muted-foreground">km</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{entry.weeklyPoints}</div>
                    <div className="text-muted-foreground">pts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-foreground">{entry.student.totalDistance.toFixed(1)}</div>
                    <div className="text-muted-foreground">total km</div>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="sm:hidden flex flex-col items-end text-sm">
                  <div className="font-semibold text-foreground">{entry.weeklyPoints} pts</div>
                  <div className="text-muted-foreground">{entry.weeklyDistance.toFixed(1)} km</div>
                </div>

                {/* Rank Badge */}
                <Badge className={`${getRankBadgeColor(entry.rank)} border-0`}>#{entry.rank}</Badge>
              </div>
            )
          })}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-6">
          <Button variant="outline">Load More Students</Button>
        </div>
      </CardContent>
    </Card>
  )
}
