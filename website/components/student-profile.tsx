"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bike, MapPin, Calendar } from "lucide-react"
import { currentStudent, getLevelColor } from "@/lib/mock-data"
import { translations } from "@/lib/translations"

export function StudentProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bike className="h-5 w-5 text-[#2596be]" />
          Profil Étudiant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg font-semibold bg-[#2596be] text-white">
              {currentStudent.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{currentStudent.name}</h2>
              <p className="text-muted-foreground">{currentStudent.studentId}</p>
              <p className="text-sm text-muted-foreground">{currentStudent.email}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className={`${getLevelColor(currentStudent.level)} bg-secondary/20`}>
                Niveau {currentStudent.level}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {currentStudent.totalDistance.toFixed(1)} km total
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {currentStudent.totalPoints} points
              </Badge>
            </div>

            <Button className="w-full sm:w-auto">Log New Ride</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
