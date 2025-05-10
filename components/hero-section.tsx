"use client"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/Ace.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

        <div className="container relative z-10 flex h-full flex-col items-start justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="mb-4 inline-block rounded-full bg-[#5DB996] px-3 py-1 text-sm font-medium text-primary-foreground">
              Informasi Menu Kampus
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">UBM's Culinary</h1>
            <p className="mt-4 max-w-md text-lg text-white/80">
              Temukan berbagai pilihan makanan yang tersedia di kantin kampus Universitas Bunda Mulia
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" asChild>
                <a href="#vendors">Lihat Menu</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-[#118B50] text-[#FBF6E9]" asChild>
                <a href="#locations">Lokasi Kantin</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
