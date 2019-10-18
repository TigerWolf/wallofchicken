const seedrandom = require("seedrandom")

const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24
const AU_TIMEZONE_OFFSET_MILLISECONDS = -10 * 60 * 60 * 1000

function daysSinceEpoch(day) {
  const now = new Date()
  const daysSinceEpoch = Math.floor(
    (now.getTime() - AU_TIMEZONE_OFFSET_MILLISECONDS) / MILLISECONDS_IN_A_DAY
  )
  const epochDayOfTheWeek = (daysSinceEpoch - 3) % 7
  const movement = day ? (7 + day - epochDayOfTheWeek) % 7 : 0
  return daysSinceEpoch + movement
}

const potentialChickens = [
  { id: "U0286USDZ", name: "Kieran" },
  { id: "U027CLUME", name: "Glenn" },
  { id: "U0A51Q7E2", name: "Karen" },
  { id: "U02DERN4E", name: "Liam" },
  { id: "U0274DF37", name: "Mac" },
  { id: "U0K8Z1KD1", name: "Melissa" },
  { id: "U44G2GD4M", name: "Usama" },
]

function getChickens(day) {
  const seed = daysSinceEpoch(day)
  const rng = seedrandom(seed * 1e5)

  return potentialChickens
    .map(x => [rng(), x])
    .sort(([a, _a], [b, _b]) => (a > b ? 1 : -1))
    .map(([_, x]) => x)
    .slice(0, 5)
}

module.exports = getChickens
