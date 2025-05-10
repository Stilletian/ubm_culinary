"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SearchMenu() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <input
      type="search"
      placeholder="Cari menu..."
      className="w-[200px] pl-8 rounded-md border border-gray-300 shadow-sm"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={handleSearch}
    />
  )
}
