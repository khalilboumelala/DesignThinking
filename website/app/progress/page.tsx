import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { LevelProgress } from "@/components/level-progress"
import { ProgressChart } from "@/components/progress-chart"
import { MilestoneTracker } from "@/components/milestone-tracker"
import { MonthlyGoals } from "@/components/monthly-goals"

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
            <p className="text-muted-foreground">Monitor your cycling journey and achievements</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LevelProgress />
            <MonthlyGoals />
          </div>

          <ProgressChart />
          <MilestoneTracker />
        </div>
      </main>
    </div>
  )
}
