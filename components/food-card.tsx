"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import VendorDetail from "@/components/vendor-detail"
import type { FoodVendor } from "@/lib/types"

interface FoodCardProps {
  vendor: FoodVendor
}

export default function FoodCard({ vendor }: FoodCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Handle empty vendor names
  const vendorName = vendor.name || (vendor.description ? `Kantin ${vendor.description}` : "Kantin UBM")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="text-lg">{vendorName}</CardTitle>
            {vendor.description && (
              <Badge variant="outline" className="ml-2">
                {vendor.description}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="max-h-[300px] overflow-y-auto">
            <ul className="space-y-2">
              {vendor.menu.slice(0, isExpanded ? vendor.menu.length : 5).map((item, index) => (
                <li key={index} className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm">{item.item}</span>
                  <span className="font-medium text-primary">Rp {item.price.toLocaleString("id-ID")}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          {vendor.menu.length > 5 && (
            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? (
                <>
                  <ChevronUp className="mr-1 h-4 w-4" /> Sembunyikan
                </>
              ) : (
                <>
                  <ChevronDown className="mr-1 h-4 w-4" /> Lihat Semua ({vendor.menu.length})
                </>
              )}
            </Button>
          )}
          <VendorDetail vendor={vendor} />
        </CardFooter>
      </Card>
    </motion.div>
  )
}
