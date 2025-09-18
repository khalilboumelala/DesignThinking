"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp } from "lucide-react"
import { currentStudent, getLevelProgress } from "@/lib/mock-data"

export function WeeklyProgress() {
  const levelInfo = getLevelProgress(currentStudent.totalDistance)
  const distanceToNext = levelInfo.nextLevelDistance - currentStudent.totalDistance

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-[#2596be]" />
          Progression de Niveau
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Niveau Actuel : {levelInfo.level}</span>
            <Badge variant="outline">{levelInfo.progress.toFixed(0)}%</Badge>
          </div>
          <Progress value={levelInfo.progress} className="h-2 [&>div]:bg-[#2596be] bg-[#2596be]/20" />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{currentStudent.totalDistance.toFixed(1)} km</span>
            <span>{levelInfo.nextLevelDistance} km</span>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-[#2596be]/20 rounded-full">
            <TrendingUp className="h-5 w-5 text-[#2596be]" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">Niveau Suivant : {levelInfo.nextLevel}</p>
            <p className="text-sm text-muted-foreground">{distanceToNext.toFixed(1)} km restants</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-amber-600">50km</p>
            <p className="text-xs text-muted-foreground">Bronze</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-gray-500">100km</p>
            <p className="text-xs text-muted-foreground">Silver</p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-yellow-500">200km</p>
            <p className="text-xs text-muted-foreground">Gold</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
