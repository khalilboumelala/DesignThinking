"use client"

import { Bike } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12">
              <img 
                src="/imt-mines-albi-logo.png" 
                alt="Logo IMT Mines Albi" 
                className="h-full" 
              />
            </div>
            <div className="flex items-center gap-2">
              
              <div>
                <h1 className="text-xl font-bold text-foreground">Bike & Quittus</h1>
                <p className="text-sm text-muted-foreground">IMT Mines Albi</p>
              </div>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
