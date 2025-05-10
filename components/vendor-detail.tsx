"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { FoodVendor } from "@/lib/types"

interface VendorDetailProps {
  vendor: FoodVendor
}

export default function VendorDetail({ vendor }: VendorDetailProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Handle empty vendor names
  const vendorName = vendor.name || (vendor.description ? `Kantin ${vendor.description}` : "Kantin UBM")

  // Filter menu items based on search query
  const filteredMenu = vendor.menu.filter((item) => item.item.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{vendorName}</span>
            {vendor.description && (
              <Badge variant="outline" className="ml-2">
                {vendor.description}
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari menu..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <ScrollArea className="h-[50vh] pr-4">
          <div className="space-y-4">
            {filteredMenu.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium">{item.item}</p>
                      </div>
                      <p className="font-bold text-primary">Rp {item.price.toLocaleString("id-ID")}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {filteredMenu.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                <p>Tidak ada menu yang sesuai dengan pencarian.</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
