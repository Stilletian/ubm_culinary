"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { foodVendors } from "@/lib/data";
import { FoodVendor } from "@/lib/types";
import Link from "next/link";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import FoodCard from "@/components/food-card";
import {Search} from "lucide-react";

const SearchPage: React.FC = () => {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("query")?.toLowerCase() || ""; // Ambil query awal dari parameter URL
    const [searchTerm, setSearchTerm] = useState<string>(initialQuery); // Menyimpan input pencarian
    const router = useRouter();

    // Filter data berdasarkan query
    const filteredResults = foodVendors
        .map((vendor) => ({
            ...vendor,
            menu: vendor.menu.filter((item) =>
                item.item.toLowerCase().includes(searchTerm) || vendor.name.toLowerCase().includes(searchTerm)
            ),
        }))
        .filter((vendor) => vendor.menu.length > 0 || vendor.name.toLowerCase().includes(searchTerm));


    // Tangani pencarian baru ketika tombol Enter ditekan
    const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchTerm.trim() !== "") {
            router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <main className="min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b backdrop-blur bg-[#5DB996]">
                <div className="container flex h-16 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-[#FBF6E9]">UBM's Culinary</span>
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
                    <div className="relative md:flex">
                        <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Cari menu lagi..."
                            className="w-[200px] pl-8 rounded-md border border-gray-300 shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>
            </header>

            {/* Section Hasil Pencarian */}
            <section id="search-results" className="bg-[#FBF6E9]">
                <div className="container py-12 md:py-24">
                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#118B50]">
                            Hasil Pencarian
                        </h2>
                        <p className="max-w-[700px] md:text-xl/relaxed text-[#118B50]">
                            Hasil pencarian untuk <strong>"{searchTerm}"</strong>
                        </p>
                    </div>

                    {/* Tombol Kembali */}
                    <div className="flex justify-start mt-4">
                        <Link href="/">
                            <button className="px-4 py-2 bg-[#5DB996] text-white text-sm font-medium rounded hover:bg-[#118B50] transition-all">
                                ← Kembali
                            </button>
                        </Link>
                    </div>

                    {/* Tabs untuk hasil pencarian */}
                    <Tabs defaultValue="semua" className="mt-12">
                        <TabsList className="grid w-full max-w-md grid-cols-1">
                            <TabsTrigger value="semua">Hasil Pencarian</TabsTrigger>
                        </TabsList>

                        <TabsContent value="semua" className="mt-8">
                            {filteredResults.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {filteredResults.map((vendor: FoodVendor, index: number) => (
                                        <FoodCard key={index} vendor={vendor} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center mt-12">
                                    <p className="text-lg font-medium text-[#118B50]">
                                        Tidak ada hasil yang ditemukan untuk <strong>"{searchTerm}"</strong>.
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </main>
    );
};

export default SearchPage;