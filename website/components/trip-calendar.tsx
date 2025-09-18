"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { bikeTrips } from "@/lib/mock-data"

export function TripCalendar() {
  // Generate calendar data for current month
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Create calendar grid
  const calendarDays = []

  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    const dayTrips = bikeTrips.filter((trip) => trip.date === dateStr)
    const totalDistance = dayTrips.reduce((sum, trip) => sum + trip.distance, 0)

    calendarDays.push({
      day,
      date: dateStr,
      trips: dayTrips,
      totalDistance,
      hasTrips: dayTrips.length > 0,
    })
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          {monthNames[currentMonth]} {currentYear}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar Grid */}
        <div className="space-y-2">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground p-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((dayData, index) => {
              if (!dayData) {
                return <div key={index} className="h-8" />
              }

              const isToday = dayData.day === currentDate.getDate()

              return (
                <div
                  key={dayData.day}
                  className={`h-8 w-8 rounded-md flex items-center justify-center text-xs font-medium transition-colors ${
                    isToday
                      ? "bg-primary text-primary-foreground"
                      : dayData.hasTrips
                        ? "bg-secondary/20 text-secondary-foreground hover:bg-secondary/30"
                        : "text-muted-foreground hover:bg-muted"
                  }`}
                  title={
                    dayData.hasTrips
                      ? `${dayData.trips.length} trip(s), ${dayData.totalDistance.toFixed(1)} km`
                      : undefined
                  }
                >
                  {dayData.day}
                  {dayData.hasTrips && <div className="absolute w-1 h-1 bg-secondary rounded-full mt-4" />}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-secondary/20 rounded-sm" />
            <span className="text-muted-foreground">Trip day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm" />
            <span className="text-muted-foreground">Today</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Recent Activity</h4>
          {bikeTrips.slice(0, 3).map((trip) => (
            <div key={trip.id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {new Date(trip.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {trip.distance.toFixed(1)} km
                  </span>
                  <Badge variant="outline" className="text-xs">
                    +{trip.pointsEarned} pts
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
