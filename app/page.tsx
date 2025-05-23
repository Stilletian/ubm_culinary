"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FoodCard from "@/components/food-card"
import HeroSection from "@/components/hero-section"
import { foodVendors } from "@/lib/data"
import SearchMenu from "@/components/SearchMenu"
import { Button } from "@/components/ui/button"
import type { FoodVendor } from "@/lib/types"

export default function Home() {
  const [priceFilter, setPriceFilter] = useState<string | null>(null)

  // Fungsi untuk memfilter vendor berdasarkan rentang harga
  const filterVendorsByPrice = (vendors: FoodVendor[]): FoodVendor[] => {
    if (!priceFilter) return vendors

    return vendors
      .map((vendor) => {
        // Salin vendor dan filter menu berdasarkan rentang harga
        const filteredMenu = vendor.menu.filter((menuItem) => {
          const price = menuItem.price
          switch (priceFilter) {
            case "under10k":
              return price < 10000
            case "10kTo20k":
              return price >= 10000 && price <= 20000
            case "above20k":
              return price > 20000
            default:
              return true
          }
        })

        // Kembalikan vendor dengan menu yang difilter
        return {
          ...vendor,
          menu: filteredMenu,
        }
      })
      .filter((vendor) => vendor.menu.length > 0) // Hanya tampilkan vendor yang memiliki menu setelah difilter
  }

  // Filter vendor untuk setiap tab
  const allVendorsFiltered = filterVendorsByPrice(foodVendors)
  const b1VendorsFiltered = filterVendorsByPrice(foodVendors.filter((vendor) => vendor.description?.includes("B1")))
  const lt10VendorsFiltered = filterVendorsByPrice(
    foodVendors.filter((vendor) => vendor.description?.includes("lt.10")),
  )

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b backdrop-blur bg-[#5DB996]">
        <div className="container flex h-16 items-center justify-between  ">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold  text-[#FBF6E9]">UBM's Culinary</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-[#FBF6E9]">
              Beranda
            </Link>
            <Link href="#vendors" className="text-sm font-medium text-[#FBF6E9]">
              Kantin
            </Link>
            <Link href="#locations" className="text-sm font-medium text-[#FBF6E9]">
              Lokasi
            </Link>
            <Link href="#about" className="text-sm font-medium text-[#FBF6E9]">
              Tentang
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative md:flex w-41">
              <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground" />
              <SearchMenu />
            </div>
          </div>
        </div>
      </header>

      <HeroSection />

      <section id="vendors" className=" bg-[#FBF6E9] ">
        <div className="container py-12 md:py-24">
          <div className="flex flex-col items-center justify-center gap-4 text-center ">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#118B50]">
              Kantin Kampus
            </h2>
            <p className="max-w-[700px]  md:text-xl/relaxed text-[#118B50]">
              Temukan berbagai pilihan makanan yang tersedia di kantin kampus UBM
            </p>
          </div>

          <Tabs defaultValue="semua" className="mt-12">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="semua">Semua</TabsTrigger>
                <TabsTrigger value="b1">Kantin B1</TabsTrigger>
                <TabsTrigger value="lt10">Kantin Lt.10</TabsTrigger>
              </TabsList>
            </div>

            {/* Filter harga dengan indikator aktif */}
            <div className="flex justify-center mt-4">
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={priceFilter === "under10k" ? "default" : "outline"}
                  size="sm"
                  className={
                    priceFilter === "under10k"
                      ? "bg-[#118B50] text-[#FBF6E9]"
                      : "bg-[#FBF6E9] text-[#118B50] hover:bg-[#FBF6E9]/80"
                  }
                  onClick={() => setPriceFilter(priceFilter === "under10k" ? null : "under10k")}
                >
                  Dibawah 10k
                </Button>
                <Button
                  variant={priceFilter === "10kTo20k" ? "default" : "outline"}
                  size="sm"
                  className={
                    priceFilter === "10kTo20k"
                      ? "bg-[#118B50] text-[#FBF6E9]"
                      : "bg-[#FBF6E9] text-[#118B50] hover:bg-[#FBF6E9]/80"
                  }
                  onClick={() => setPriceFilter(priceFilter === "10kTo20k" ? null : "10kTo20k")}
                >
                  10k - 20k
                </Button>
                <Button
                  variant={priceFilter === "above20k" ? "default" : "outline"}
                  size="sm"
                  className={
                    priceFilter === "above20k"
                      ? "bg-[#118B50] text-[#FBF6E9]"
                      : "bg-[#FBF6E9] text-[#118B50] hover:bg-[#FBF6E9]/80"
                  }
                  onClick={() => setPriceFilter(priceFilter === "above20k" ? null : "above20k")}
                >
                  Diatas 20k
                </Button>
                {priceFilter && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#FBF6E9] text-[#118B50] hover:bg-[#FBF6E9]/80"
                    onClick={() => setPriceFilter(null)}
                  >
                    Reset Filter
                  </Button>
                )}
              </div>
            </div>

            <TabsContent value="semua" className="mt-8">
              {allVendorsFiltered.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {allVendorsFiltered.map((vendor, index) => (
                    <FoodCard key={index} vendor={vendor} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-[#118B50] text-lg">Tidak ada menu yang sesuai dengan filter harga.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="b1" className="mt-8">
              {b1VendorsFiltered.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {b1VendorsFiltered.map((vendor, index) => (
                    <FoodCard key={index} vendor={vendor} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-[#118B50] text-lg">Tidak ada menu yang sesuai dengan filter harga di Kantin B1.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="lt10" className="mt-8">
              {lt10VendorsFiltered.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {lt10VendorsFiltered.map((vendor, index) => (
                    <FoodCard key={index} vendor={vendor} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-[#118B50] text-lg">
                    Tidak ada menu yang sesuai dengan filter harga di Kantin Lt.10.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="locations" className="bg-muted py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Lokasi Kantin</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              Informasi lokasi kantin di kampus UBM
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 transition-all group-hover:from-black/70"></div>
              <img
                src="/Sisyphus.jpg"
                alt="Kantin B1"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">Kantin Basement (B1)</h3>
                <p className="text-white/80">Lantai Basement Gedung Utama</p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 transition-all group-hover:from-black/70"></div>
              <img
                src="/aleph.jpg"
                alt="Kantin Lt.10"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">Kantin Lantai 10</h3>
                <p className="text-white/80">Lantai 10 Gedung Utama</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="about" className="border-t bg-[#5DB996] backdrop-blur">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-[#FBF6E9]">UBM's Culinary</h3>
              <p className="mt-2 text-sm text-muted-foreground text-white">
                Informasi menu makanan yang tersedia di kantin kampus Universitas Bunda Mulia
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Jam Operasional Kantin</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground text-white">
                <li>Senin - Jumat: 07:00 - 17:00</li>
                <li>Sabtu/Minggu: Tutup</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Kontak</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground text-white">
                <li>
                  UBM Tower, Alam Sutera, Jl. Jalur Sutera Bar. No.Kav.7-9, Panunggangan Tim., Kec. Pinang, Kota
                  Tangerang, Banten 15143
                </li>
                <li>info@ubm.ac.id</li>
                <li>+62 857-7966-0661</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground text-white">
            © {new Date().getFullYear()} UBM's Culinary. Hak Cipta Tidak Dilindungi Kan Yang Buat Gue
          </div>
        </div>
      </footer>
    </main>
  )
}
