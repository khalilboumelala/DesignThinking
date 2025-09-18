import { Header } from "@/components/header"
import { Navigation } from "@/components/navigation"
import { StudentProfile } from "@/components/student-profile"
import { QuickStats } from "@/components/quick-stats"
import { RecentTrips } from "@/components/recent-trips"
import { WeeklyProgress } from "@/components/weekly-progress"
import { Notifications } from "@/components/notifications"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2596be]">Tableau de Bord</h1>
            <p className="text-muted-foreground">Bienvenue sur l'application de suivi vélo de l'IMT Mines Albi</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Main content */}
            <div className="lg:col-span-2 space-y-6">
              <StudentProfile />
              <QuickStats />
              <WeeklyProgress />
              <RecentTrips />
            </div>

            {/* Right column - Sidebar */}
            <div className="space-y-6">
              <Notifications />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
