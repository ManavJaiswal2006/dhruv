export type ValentineWeek = 1 | 2 | 3 | 4

export interface WeekTheme {
  weekNumber: ValentineWeek
  weekName: string
  theme: string
  color: string
  character: string
  greeting: string
  specialMessage: string
  mainFeature: string
  unlockableContent: string
  challenge: string
  secretHint: string
  cards: {
    title: string
    description: string
    icon: string
  }[]
}

export const weekThemes: Record<ValentineWeek, WeekTheme> = {
  1: {
    weekNumber: 1,
    weekName: 'Week 1: The Beginning',
    theme: 'First Spark',
    color: '#ff69b4',
    character: '💕',
    greeting: 'The Magic Begins...',
    specialMessage: 'This is just the start of our magical journey together. Each week brings new surprises!',
    mainFeature: 'Memory Collection',
    unlockableContent: 'First Love Letter',
    challenge: 'Collect 5 Memories',
    secretHint: 'Click the heart 7 times',
    cards: [
      { title: 'The Pensieve', description: 'View our first memories together', icon: '📸' },
      { title: 'Owl Post', description: 'Your first letter from my heart', icon: '💌' },
      { title: 'The Mirror', description: 'Our beginning story', icon: '✨' },
    ],
  },
  2: {
    weekNumber: 2,
    weekName: 'Week 2: Growing Closer',
    theme: 'Deepening Bond',
    color: '#ff1493',
    character: '🌹',
    greeting: 'Our Connection Grows...',
    specialMessage: 'As we get closer to Valentine\'s Day, our bond grows stronger. New adventures await!',
    mainFeature: 'Spell Casting',
    unlockableContent: 'Love Spell Master',
    challenge: 'Cast 3 Love Spells',
    secretHint: 'Find the hidden rose',
    cards: [
      { title: 'The Pensieve', description: 'More memories to discover', icon: '📸' },
      { title: 'Owl Post', description: 'A deeper letter from my heart', icon: '💌' },
      { title: 'Spell Chamber', description: 'Master magical spells together', icon: '🪄' },
      { title: 'The Mirror', description: 'Our growing story', icon: '✨' },
    ],
  },
  3: {
    weekNumber: 3,
    weekName: 'Week 3: The Promise',
    theme: 'Unbreakable Vow',
    color: '#dc143c',
    character: '💍',
    greeting: 'The Promise Week...',
    specialMessage: 'We\'re almost there! This week is about promises and vows that last forever.',
    mainFeature: 'Potion Brewing',
    unlockableContent: 'Eternal Love Potion',
    challenge: 'Brew the Perfect Potion',
    secretHint: 'Click the ring 10 times',
    cards: [
      { title: 'The Pensieve', description: 'Cherished memories', icon: '📸' },
      { title: 'Owl Post', description: 'A promise letter', icon: '💌' },
      { title: 'Potion Lab', description: 'Brew love potions together', icon: '🧪' },
      { title: 'Spell Chamber', description: 'Advanced spells', icon: '🪄' },
      { title: 'The Mirror', description: 'Our promise story', icon: '✨' },
    ],
  },
  4: {
    weekNumber: 4,
    weekName: 'Week 4: The Grand Finale',
    theme: 'Valentine\'s Day',
    color: '#c71585',
    character: '💖',
    greeting: 'Valentine\'s Day - The Final Question!',
    specialMessage: 'This is it! The moment we\'ve been building towards. Will you be mine forever?',
    mainFeature: 'The Proposal',
    unlockableContent: 'Forever Together Badge',
    challenge: 'Say Yes to Forever',
    secretHint: 'Everything unlocks today!',
    cards: [
      { title: 'The Pensieve', description: 'All our memories', icon: '📸' },
      { title: 'Owl Post', description: 'The final letter', icon: '💌' },
      { title: 'Potion Lab', description: 'Master potions', icon: '🧪' },
      { title: 'Spell Chamber', description: 'All spells unlocked', icon: '🪄' },
      { title: 'The Mirror', description: 'Our complete story', icon: '✨' },
      { title: 'The Proposal', description: 'The final question', icon: '💍' },
    ],
  },
}

export function getValentineWeek(): ValentineWeek {
  const now = new Date()
  const year = now.getFullYear()
  const febFirst = new Date(year, 1, 1) // February 1st (month is 0-indexed)
  const daysSinceFebFirst = Math.floor((now.getTime() - febFirst.getTime()) / (1000 * 60 * 60 * 24))
  
  // Calculate which week of February (1-4)
  const week = Math.floor(daysSinceFebFirst / 7) + 1
  
  // Clamp between 1 and 4
  if (week < 1) return 1
  if (week > 4) return 4
  return week as ValentineWeek
}

export function getWeekTheme(week?: ValentineWeek): WeekTheme {
  const currentWeek = week || getValentineWeek()
  return weekThemes[currentWeek]
}

export function getDaysUntilValentines(): number {
  const now = new Date()
  const year = now.getFullYear()
  let valentines = new Date(year, 1, 14) // February 14th
  
  // If Valentine's Day has passed this year, use next year
  if (now > valentines) {
    valentines = new Date(year + 1, 1, 14)
  }
  
  const diffTime = valentines.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return diffDays
}
