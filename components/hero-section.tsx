"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (searchTerm.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <section className="relative bg-[#118B50] py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#118B50] opacity-90"></div>
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#5DB996] opacity-50"></div>
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#5DB996] opacity-50"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center text-white"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              UBM's <span className="text-[#FBF6E9]">Culinary</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl">
              Temukan berbagai pilihan makanan lezat di kantin kampus Universitas Bunda Mulia
            </p>

            <form onSubmit={handleSearch} className="mt-8 flex w-full max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Cari menu atau kantin..."
                  className="h-12 w-full rounded-l-md border-0 bg-white pl-10 pr-4 text-gray-900 ring-0 focus:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="h-12 rounded-r-md bg-[#FBF6E9] px-6 font-medium text-[#118B50] transition-colors hover:bg-white"
              >
                Cari
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-sm text-[#FBF6E9]">Populer:</span>
              {["Nasi Goreng", "Mie Ayam", "Boba", "Kopi"].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(item)
                    router.push(`/search?query=${encodeURIComponent(item)}`)
                  }}
                  className="rounded-full bg-[#5DB996]/30 px-3 py-1 text-sm text-white transition-colors hover:bg-[#5DB996]/50"
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-[#FBF6E9] sm:h-[400px] sm:w-[400px]">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="UBM Culinary"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
