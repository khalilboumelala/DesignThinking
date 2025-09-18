"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Trophy, Target } from "lucide-react"

export function StreakTracker() {
  const currentStreak = 5
  const longestStreak = 12
  const streakGoal = 7

  // Mock streak data for the past 14 days
  const streakData = [
    { day: "Mon", active: true, date: "15" },
    { day: "Tue", active: true, date: "16" },
    { day: "Wed", active: false, date: "17" },
    { day: "Thu", active: true, date: "18" },
    { day: "Fri", active: true, date: "19" },
    { day: "Sat", active: true, date: "20" },
    { day: "Sun", active: true, date: "21" },
    { day: "Mon", active: true, date: "22" },
    { day: "Tue", active: false, date: "23" },
    { day: "Wed", active: false, date: "24" },
    { day: "Thu", active: true, date: "25" },
    { day: "Fri", active: true, date: "26" },
    { day: "Sat", active: true, date: "27" },
    { day: "Sun", active: true, date: "28" },
  ]

  const streakRewards = [
    { days: 7, reward: "Weekly Warrior Badge", points: 100, unlocked: false },
    { days: 14, reward: "Consistency Champion", points: 250, unlocked: false },
    { days: 30, reward: "Monthly Master", points: 500, unlocked: false },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-primary" />
          Streak Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Streak */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <Flame className="h-8 w-8 text-primary" />
          </div>
          <div>
            <div className="text-3xl font-bold text-foreground">{currentStreak}</div>
            <p className="text-sm text-muted-foreground">day streak</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            Keep it up!
          </Badge>
        </div>

        {/* Streak Calendar */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-foreground">Last 14 Days</h4>
          <div className="grid grid-cols-7 gap-1">
            {streakData.map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    day.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {day.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Streak Stats */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-lg font-bold text-foreground">{longestStreak}</div>
            <p className="text-xs text-muted-foreground">Longest Streak</p>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold text-foreground">{streakGoal - currentStreak}</div>
            <p className="text-xs text-muted-foreground">Days to Goal</p>
          </div>
        </div>

        {/* Streak Rewards */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Streak Rewards</h4>
          {streakRewards.map((reward, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                currentStreak >= reward.days ? "bg-primary/5 border-primary/20" : "bg-muted/30 border-muted"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy
                    className={`h-4 w-4 ${currentStreak >= reward.days ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        currentStreak >= reward.days ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {reward.reward}
                    </p>
                    <p className="text-xs text-muted-foreground">{reward.days} day streak</p>
                  </div>
                </div>
                <Badge variant={currentStreak >= reward.days ? "secondary" : "outline"} className="text-xs">
                  +{reward.points} pts
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Motivation */}
        <div className="p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Streak Tip</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Just {streakGoal - currentStreak} more days to unlock the Weekly Warrior badge!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
