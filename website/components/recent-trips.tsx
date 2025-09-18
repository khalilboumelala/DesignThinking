"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Award, ArrowRight } from "lucide-react"
import { bikeTrips } from "@/lib/mock-data"
import Link from "next/link"

export function RecentTrips() {
  const recentTrips = bikeTrips.slice(0, 3)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-[#2596be]" />
          Trajets Récents
        </CardTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/history" className="flex items-center gap-1">
            Voir Tout
            <ArrowRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTrips.map((trip) => (
            <div key={trip.id} className="flex items-center justify-between p-4 bg-[#2596be]/5 rounded-lg hover:bg-[#2596be]/10 transition-colors">
              <div className="space-y-1">
                <p className="font-medium text-foreground">{trip.route || "Trajet à vélo"}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[#2596be]" />
                    {trip.distance.toFixed(1)} km
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#2596be]" />
                    {trip.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-3 w-3" />
                    {trip.pointsEarned} pts
                  </span>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary">{new Date(trip.date).toLocaleDateString()}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
