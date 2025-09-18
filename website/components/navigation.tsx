"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Trophy, Target, History, Award, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/translations"

const navigation = [
  { name: translations.navigation.dashboard, href: "/", icon: Home },
  { name: translations.navigation.progress, href: "/progress", icon: Target },
  { name: translations.navigation.leaderboard, href: "/leaderboard", icon: Trophy },
  { name: translations.navigation.achievements, href: "/achievements", icon: Award },
  { name: translations.navigation.history, href: "/history", icon: History },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm">
          <nav className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-4">
            <div className="mt-16 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>
      )}

      {/* Desktop navigation */}
      <nav className="hidden md:flex border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-4 text-sm font-medium border-b-2 transition-colors",
                    pathname === item.href
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
