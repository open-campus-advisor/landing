"use client"

import { useState } from "react"
import { TagInput } from "./TagInput"
import type { AcademicData, GoalsData } from "@/lib/compress-profile"

const SCHOOLS = [
  "Wesleyan University",
  "Columbia University",
  "MIT",
  "Stanford University",
  "Yale University",
  "Brown University",
  "University of Pennsylvania",
  "Dartmouth College",
  "Cornell University",
  "Georgetown Law",
  "Swarthmore College",
]

const YEARS = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate"]

interface Props {
  initialAcademic: AcademicData | null
  initialGoals: GoalsData | null
  initialCompressed: string
}

export function ProfileForm({ initialAcademic, initialGoals, initialCompressed }: Props) {
  const [academic, setAcademic] = useState<AcademicData>(initialAcademic ?? {})
  const [goals, setGoals] = useState<GoalsData>(initialGoals ?? {})
  const [compressed, setCompressed] = useState(initialCompressed)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState("")

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setSaveError("")
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ academic, goals }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Save failed")
      if (data.compressed) setCompressed(data.compressed)
      setSaved(true)
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Save failed")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-10">
      <section className="space-y-5">
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400">Academic</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">School</label>
            <select
              value={academic.school ?? ""}
              onChange={(e) => setAcademic({ ...academic, school: e.target.value || null })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-900 transition-colors bg-white"
            >
              <option value="">Select school</option>
              {SCHOOLS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Year</label>
            <select
              value={academic.year ?? ""}
              onChange={(e) => setAcademic({ ...academic, year: e.target.value || null })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-900 transition-colors bg-white"
            >
              <option value="">Select year</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Major</label>
            <input
              type="text"
              value={academic.major ?? ""}
              onChange={(e) => setAcademic({ ...academic, major: e.target.value || null })}
              placeholder="e.g. Computer Science"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-900 transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">
              GPA <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="4"
              value={academic.gpa ?? ""}
              onChange={(e) =>
                setAcademic({ ...academic, gpa: e.target.value ? parseFloat(e.target.value) : null })
              }
              placeholder="3.7"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-900 transition-colors"
            />
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400">Goals</h2>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Career targets <span className="text-gray-400 font-normal">(max 3, press Enter to add)</span>
          </label>
          <TagInput
            value={goals.career_targets ?? []}
            onChange={(v) => setGoals({ ...goals, career_targets: v })}
            placeholder="e.g. climate policy analyst"
            max={3}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Interests <span className="text-gray-400 font-normal">(max 5)</span>
          </label>
          <TagInput
            value={goals.interests ?? []}
            onChange={(v) => setGoals({ ...goals, interests: v })}
            placeholder="e.g. machine learning, sustainability"
            max={5}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Constraints <span className="text-gray-400 font-normal">(location, timeline, budget)</span>
          </label>
          <TagInput
            value={goals.constraints ?? []}
            onChange={(v) => setGoals({ ...goals, constraints: v })}
            placeholder="e.g. NYC only, budget-conscious"
          />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-400">Courses</h2>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Completed courses <span className="text-gray-400 font-normal">(course codes)</span>
          </label>
          <TagInput
            value={academic.completed_courses ?? []}
            onChange={(v) => setAcademic({ ...academic, completed_courses: v })}
            placeholder="e.g. CS101 ENV200"
          />
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save profile"}
        </button>
        {saved && <p className="text-sm text-green-600">Saved.</p>}
        {saveError && <p className="text-sm text-red-500">{saveError}</p>}
      </div>

      {compressed && (
        <section className="bg-gray-50 rounded-xl p-5 space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-gray-400">
            This is what your advisor knows about you
          </p>
          <p className="text-sm text-gray-700 leading-relaxed font-mono">{compressed}</p>
        </section>
      )}
    </form>
  )
}
