import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { AchievementGrid } from "@/components/achievement-grid"
import { AchievementStats } from "@/components/achievement-stats"
import { DailyObjectives } from "@/components/daily-objectives"
import { StreakTracker } from "@/components/streak-tracker"

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2596be]">Réalisations & Objectifs</h1>
            <p className="text-muted-foreground">Débloquez des badges et complétez des objectifs pour gagner plus de points quittus</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AchievementStats />
              <AchievementGrid />
            </div>
            <div className="space-y-6">
              <StreakTracker />
              <DailyObjectives />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
