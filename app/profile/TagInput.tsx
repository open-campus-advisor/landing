"use client"

import { useState, KeyboardEvent } from "react"

interface TagInputProps {
  value: string[]
  onChange: (tags: string[]) => void
  placeholder?: string
  max?: number
}

export function TagInput({ value, onChange, placeholder, max }: TagInputProps) {
  const [input, setInput] = useState("")

  function addCurrent() {
    const trimmed = input.trim()
    if (!trimmed || value.includes(trimmed)) { setInput(""); return }
    if (max && value.length >= max) { setInput(""); return }
    onChange([...value, trimmed])
    setInput("")
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addCurrent()
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-wrap gap-2 p-2.5 border border-gray-200 rounded-lg min-h-[44px] focus-within:border-gray-900 transition-colors cursor-text">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-2.5 py-0.5 rounded-md"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((t) => t !== tag))}
            className="text-gray-400 hover:text-gray-700 leading-none"
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        onBlur={addCurrent}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[140px] text-sm outline-none bg-transparent placeholder:text-gray-400"
      />
    </div>
  )
}
