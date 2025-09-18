"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Calendar } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { bikeTrips } from "@/lib/mock-data"

export function ProgressChart() {
  // Generate cumulative distance data
  const sortedTrips = [...bikeTrips].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  let cumulativeDistance = 0
  const cumulativeData = sortedTrips.map((trip) => {
    cumulativeDistance += trip.distance
    return {
      date: new Date(trip.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      distance: cumulativeDistance,
      dailyDistance: trip.distance,
      points: trip.pointsEarned,
    }
  })

  // Generate weekly data
  const weeklyData = []
  const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"]
  const weeklyDistances = [32.5, 28.7, 35.2, 31.1]
  const weeklyPoints = [325, 287, 352, 311]

  for (let i = 0; i < weeks.length; i++) {
    weeklyData.push({
      week: weeks[i],
      distance: weeklyDistances[i],
      points: weeklyPoints[i],
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Cumulative Progress Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Cumulative Distance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cumulativeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-muted-foreground" fontSize={12} />
                <YAxis className="text-muted-foreground" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey="distance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Badge variant="secondary">Total: {cumulativeDistance.toFixed(1)} km</Badge>
            <Badge variant="outline">Avg: {(cumulativeDistance / sortedTrips.length).toFixed(1)} km/trip</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Weekly Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-muted-foreground" fontSize={12} />
                <YAxis className="text-muted-foreground" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="distance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-4">
            <Badge variant="secondary">This Week: 31.1 km</Badge>
            <Badge variant="outline">Best Week: 35.2 km</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
