"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Award, Calendar, Search, Filter, Download } from "lucide-react"
import { bikeTrips } from "@/lib/mock-data"

export function TripHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [filterBy, setFilterBy] = useState("all")

  // Sort and filter trips
  let filteredTrips = [...bikeTrips]

  if (searchTerm) {
    filteredTrips = filteredTrips.filter(
      (trip) =>
        trip.route?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.date.includes(searchTerm) ||
        trip.distance.toString().includes(searchTerm),
    )
  }

  if (filterBy !== "all") {
    const now = new Date()
    const filterDate = new Date()

    switch (filterBy) {
      case "week":
        filterDate.setDate(now.getDate() - 7)
        break
      case "month":
        filterDate.setMonth(now.getMonth() - 1)
        break
      case "3months":
        filterDate.setMonth(now.getMonth() - 3)
        break
    }

    filteredTrips = filteredTrips.filter((trip) => new Date(trip.date) >= filterDate)
  }

  // Sort trips
  filteredTrips.sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "distance":
        return b.distance - a.distance
      case "duration":
        return b.duration - a.duration
      case "points":
        return b.pointsEarned - a.pointsEarned
      default:
        return 0
    }
  })

  const exportData = () => {
    // Mock export functionality
    const csvContent = [
      "Date,Route,Distance (km),Duration (min),Points Earned",
      ...filteredTrips.map(
        (trip) => `${trip.date},${trip.route || "N/A"},${trip.distance},${trip.duration},${trip.pointsEarned}`,
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bike-trips-history.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Trip History ({filteredTrips.length} trips)
          </CardTitle>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="h-3 w-3 mr-1" />
              Export
            </Button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search trips, routes, dates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-32">
              <Filter className="h-3 w-3 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="duration">Duration</SelectItem>
              <SelectItem value="points">Points</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredTrips.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No trips found matching your criteria</p>
              <Button variant="outline" className="mt-2 bg-transparent" onClick={() => setSearchTerm("")}>
                Clear Filters
              </Button>
            </div>
          ) : (
            filteredTrips.map((trip) => (
              <div key={trip.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground">{trip.route || "Bike Trip"}</h4>
                      <Badge variant="outline" className="text-xs">
                        {new Date(trip.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {trip.distance.toFixed(1)} km
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {trip.duration} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {trip.pointsEarned} pts
                      </span>
                    </div>

                    {/* Trip metrics */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Avg Speed: {((trip.distance / trip.duration) * 60).toFixed(1)} km/h</span>
                      <span>Points/km: {(trip.pointsEarned / trip.distance).toFixed(0)}</span>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      +{trip.pointsEarned}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{new Date(trip.date).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {filteredTrips.length > 0 && (
          <div className="flex justify-center mt-6">
            <Button variant="outline">Load More Trips</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
