export interface Student {
  id: string
  name: string
  studentId: string
  email: string
  totalDistance: number
  totalPoints: number
  level: "Bronze" | "Silver" | "Gold" | "Platinum"
  avatar?: string
}

export interface BikeTrip {
  id: string
  studentId: string
  date: string
  distance: number
  duration: number // in minutes
  pointsEarned: number
  route?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  pointsRequired: number
  unlocked: boolean
  unlockedAt?: string
}

export interface LeaderboardEntry {
  rank: number
  student: Student
  weeklyDistance: number
  weeklyPoints: number
}

// Mock current student data
export const currentStudent: Student = {
  id: "1",
  name: "Marie Dubois",
  studentId: "IMT2024001",
  email: "marie.dubois@student.imt-mines-albi.fr",
  totalDistance: 127.5,
  totalPoints: 1275,
  level: "Silver",
}

// Mock bike trips data
export const bikeTrips: BikeTrip[] = [
  {
    id: "1",
    studentId: "1",
    date: "2024-01-15",
    distance: 8.2,
    duration: 25,
    pointsEarned: 82,
    route: "Campus → Centre-ville",
  },
  {
    id: "2",
    studentId: "1",
    date: "2024-01-14",
    distance: 12.5,
    duration: 35,
    pointsEarned: 125,
    route: "Campus → Parc Rochegude",
  },
  {
    id: "3",
    studentId: "1",
    date: "2024-01-13",
    distance: 6.8,
    duration: 20,
    pointsEarned: 68,
    route: "Résidence → Campus",
  },
  {
    id: "4",
    studentId: "1",
    date: "2024-01-12",
    distance: 15.3,
    duration: 45,
    pointsEarned: 153,
    route: "Campus → Albi Cathedral",
  },
  {
    id: "5",
    studentId: "1",
    date: "2024-01-11",
    distance: 9.7,
    duration: 28,
    pointsEarned: 97,
    route: "Campus → Supermarché",
  },
]

// Mock achievements data
export const achievements: Achievement[] = [
  {
    id: "1",
    title: "First Ride",
    description: "Complete your first bike trip",
    icon: "🚴",
    pointsRequired: 10,
    unlocked: true,
    unlockedAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Bronze Cyclist",
    description: "Reach 50km total distance",
    icon: "🥉",
    pointsRequired: 500,
    unlocked: true,
    unlockedAt: "2024-01-12",
  },
  {
    id: "3",
    title: "Silver Cyclist",
    description: "Reach 100km total distance",
    icon: "🥈",
    pointsRequired: 1000,
    unlocked: true,
    unlockedAt: "2024-01-14",
  },
  {
    id: "4",
    title: "Gold Cyclist",
    description: "Reach 200km total distance",
    icon: "🥇",
    pointsRequired: 2000,
    unlocked: false,
  },
  {
    id: "5",
    title: "Weekly Warrior",
    description: "Ride 10 times in one week",
    icon: "⚡",
    pointsRequired: 100,
    unlocked: false,
  },
  {
    id: "6",
    title: "Distance Master",
    description: "Complete a 20km+ ride",
    icon: "🏆",
    pointsRequired: 200,
    unlocked: false,
  },
]

// Mock leaderboard data
export const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    student: {
      id: "2",
      name: "Pierre Martin",
      studentId: "IMT2024002",
      email: "pierre.martin@student.imt-mines-albi.fr",
      totalDistance: 245.8,
      totalPoints: 2458,
      level: "Gold",
    },
    weeklyDistance: 45.2,
    weeklyPoints: 452,
  },
  {
    rank: 2,
    student: currentStudent,
    weeklyDistance: 38.7,
    weeklyPoints: 387,
  },
  {
    rank: 3,
    student: {
      id: "3",
      name: "Sophie Laurent",
      studentId: "IMT2024003",
      email: "sophie.laurent@student.imt-mines-albi.fr",
      totalDistance: 189.3,
      totalPoints: 1893,
      level: "Silver",
    },
    weeklyDistance: 32.1,
    weeklyPoints: 321,
  },
  {
    rank: 4,
    student: {
      id: "4",
      name: "Thomas Rousseau",
      studentId: "IMT2024004",
      email: "thomas.rousseau@student.imt-mines-albi.fr",
      totalDistance: 156.7,
      totalPoints: 1567,
      level: "Silver",
    },
    weeklyDistance: 28.9,
    weeklyPoints: 289,
  },
  {
    rank: 5,
    student: {
      id: "5",
      name: "Emma Moreau",
      studentId: "IMT2024005",
      email: "emma.moreau@student.imt-mines-albi.fr",
      totalDistance: 134.2,
      totalPoints: 1342,
      level: "Silver",
    },
    weeklyDistance: 25.6,
    weeklyPoints: 256,
  },
]

// Helper functions
export function getLevelProgress(distance: number) {
  if (distance >= 200) return { level: "Gold", progress: 100, nextLevel: "Platinum", nextLevelDistance: 500 }
  if (distance >= 100)
    return { level: "Silver", progress: ((distance - 100) / 100) * 100, nextLevel: "Gold", nextLevelDistance: 200 }
  if (distance >= 50)
    return { level: "Bronze", progress: ((distance - 50) / 50) * 100, nextLevel: "Silver", nextLevelDistance: 100 }
  return { level: "Bronze", progress: (distance / 50) * 100, nextLevel: "Silver", nextLevelDistance: 50 }
}

export function getLevelColor(level: string) {
  switch (level) {
    case "Bronze":
      return "text-amber-600"
    case "Silver":
      return "text-gray-500"
    case "Gold":
      return "text-yellow-500"
    case "Platinum":
      return "text-purple-500"
    default:
      return "text-gray-400"
  }
}
