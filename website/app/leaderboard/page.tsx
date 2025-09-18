import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { LeaderboardStats } from "@/components/leaderboard-stats"
import { TopPerformers } from "@/components/top-performers"

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
            <p className="text-muted-foreground">See how you rank against other IMT Mines Albi students</p>
          </div>

          <LeaderboardStats />
          <TopPerformers />
          <LeaderboardTable />
        </div>
      </main>
    </div>
  )
}
