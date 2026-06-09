export interface AcademicData {
  school?: string | null
  major?: string | null
  year?: string | null
  gpa?: number | null
  completed_courses?: string[] | null
  transfer_credits?: string[] | null
}

export interface GoalsData {
  career_targets?: string[] | null
  interests?: string[] | null
  constraints?: string[] | null
}

export interface ProfileData {
  academic?: AcademicData | null
  goals?: GoalsData | null
}

export function compressProfile(profile: ProfileData): string {
  const parts: string[] = []
  const a = profile.academic ?? {}
  const g = profile.goals ?? {}

  const who: string[] = []
  if (a.year) who.push(a.year)
  if (a.school) who.push(`at ${a.school}`)
  if (a.major) who.push(a.major)
  if (who.length) parts.push(who.join(" "))

  if (g.career_targets?.length) {
    parts.push(`goal: ${g.career_targets.slice(0, 2).join(", ")}`)
  }

  if (a.completed_courses?.length) {
    parts.push(`completed: ${a.completed_courses.slice(0, 10).join(" ")}`)
  }

  if (a.gpa) {
    parts.push(`GPA: ${a.gpa}`)
  }

  if (g.constraints?.length) {
    parts.push(`constraints: ${g.constraints.join(", ")}`)
  }

  return parts.join(", ")
}
