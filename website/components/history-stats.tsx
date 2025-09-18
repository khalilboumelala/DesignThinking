"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, MapPin, Clock, Award, Calendar, Target } from "lucide-react"
import { bikeTrips, currentStudent } from "@/lib/mock-data"

export function HistoryStats() {
  const totalTrips = bikeTrips.length
  const totalDuration = bikeTrips.reduce((sum, trip) => sum + trip.duration, 0)
  const averageDistance = totalTrips > 0 ? currentStudent.totalDistance / totalTrips : 0
  const averageDuration = totalTrips > 0 ? totalDuration / totalTrips : 0

  // Calculate this month's stats
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const thisMonthTrips = bikeTrips.filter((trip) => {
    const tripDate = new Date(trip.date)
    return tripDate.getMonth() === thisMonth && tripDate.getFullYear() === thisYear
  })

  const monthlyDistance = thisMonthTrips.reduce((sum, trip) => sum + trip.distance, 0)
  const monthlyPoints = thisMonthTrips.reduce((sum, trip) => sum + trip.pointsEarned, 0)

  const stats = [
    {
      title: "Total Trips",
      value: totalTrips.toString(),
      description: "all time",
      icon: Calendar,
      color: "text-chart-1",
    },
    {
      title: "Total Distance",
      value: `${currentStudent.totalDistance.toFixed(1)} km`,
      description: "all time",
      icon: MapPin,
      color: "text-primary",
    },
    {
      title: "Total Time",
      value: `${Math.floor(totalDuration / 60)}h ${totalDuration % 60}m`,
      description: "cycling time",
      icon: Clock,
      color: "text-chart-2",
    },
    {
      title: "Total Points",
      value: currentStudent.totalPoints.toLocaleString(),
      description: "quittus points",
      icon: Award,
      color: "text-secondary",
    },
    {
      title: "Avg Distance",
      value: `${averageDistance.toFixed(1)} km`,
      description: "per trip",
      icon: Target,
      color: "text-chart-3",
    },
    {
      title: "Avg Duration",
      value: `${averageDuration.toFixed(0)} min`,
      description: "per trip",
      icon: TrendingUp,
      color: "text-chart-4",
    },
  ]

  return (
    <div className="space-y-4">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Monthly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            This Month Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-foreground">{thisMonthTrips.length}</div>
              <p className="text-sm text-muted-foreground">Trips</p>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-foreground">{monthlyDistance.toFixed(1)} km</div>
              <p className="text-sm text-muted-foreground">Distance</p>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-foreground">{monthlyPoints}</div>
              <p className="text-sm text-muted-foreground">Points</p>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl font-bold text-foreground">
                {thisMonthTrips.length > 0 ? (monthlyDistance / thisMonthTrips.length).toFixed(1) : "0"} km
              </div>
              <p className="text-sm text-muted-foreground">Avg per trip</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
