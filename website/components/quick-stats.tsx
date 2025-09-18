"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Target, Award, Calendar } from "lucide-react"
import { currentStudent, bikeTrips } from "@/lib/mock-data"

export function QuickStats() {
  const thisWeekTrips = bikeTrips.filter((trip) => {
    const tripDate = new Date(trip.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return tripDate >= weekAgo
  })

  const weeklyDistance = thisWeekTrips.reduce((sum, trip) => sum + trip.distance, 0)
  const weeklyPoints = thisWeekTrips.reduce((sum, trip) => sum + trip.pointsEarned, 0)
  const averageDistance = bikeTrips.length > 0 ? currentStudent.totalDistance / bikeTrips.length : 0

  const stats = [
    {
      title: "Distance Totale",
      value: `${currentStudent.totalDistance.toFixed(1)} km`,
      icon: TrendingUp,
      description: "Depuis le début",
      color: "text-[#2596be]",
    },
    {
      title: "Distance Hebdomadaire",
      value: `${weeklyDistance.toFixed(1)} km`,
      icon: Target,
      description: "Cette semaine",
      color: "text-[#2596be]",
    },
    {
      title: "Points Totaux",
      value: currentStudent.totalPoints.toLocaleString(),
      icon: Award,
      description: "Points quittus gagnés",
      color: "text-[#2596be]",
    },
    {
      title: "Average Trip",
      value: `${averageDistance.toFixed(1)} km`,
      icon: Calendar,
      description: "Per ride",
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
