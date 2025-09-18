import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { TripHistory } from "@/components/trip-history"
import { HistoryStats } from "@/components/history-stats"
import { TripCalendar } from "@/components/trip-calendar"

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Trip History</h1>
            <p className="text-muted-foreground">View and analyze your cycling activity over time</p>
          </div>

          <HistoryStats />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TripHistory />
            </div>
            <div>
              <TripCalendar />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
