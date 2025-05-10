"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Gunakan useRouter untuk navigasi ke halaman lain
import { foodVendors } from "@/lib/data";
import { FoodVendor } from "@/lib/types";

const SearchMenu: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>(""); // Menyimpan input pencarian
    const router = useRouter(); // Hook untuk navigasi

    // Fungsi untuk menangani pencarian ketika tombol Enter ditekan
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && searchTerm.trim() !== "") {
            // Navigasikan ke halaman hasil pencarian dengan query
            router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div>
            <input
                type="search"
                placeholder="Cari menu..."
                className="w-[200px] pl-8 rounded-md border border-gray-300 shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Perbarui input pengguna
                onKeyDown={handleKeyDown} // Tangani tombol Enter
            />
        </div>
    );
};

export default SearchMenu;