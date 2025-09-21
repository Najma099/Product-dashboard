"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter } from "lucide-react"

interface ProductFiltersProps {
  category: string
  setCategory: (value: string) => void
  certification: string
  setCertification: (value: string) => void
}

const categories = [
  "Beverages",
  "Food & Snacks", 
  "Health & Wellness",
  "Personal Care",
  "Household",
  "Baby & Kids",
  "Pet Care",
  "Supplements",
  "Fruits",
  "Vegetables", 
  "Meat",
  "Seafood",
  "Dairy"
]

const certifications = [
  { value: "Gold", color: "bg-yellow-500" },
  { value: "Platinum", color: "bg-gray-400" },
  { value: "Silver", color: "bg-gray-300" },
  { value: "Green", color: "bg-green-500" },
  { value: "None", color: "bg-gray-200 dark:bg-gray-600" }
]

export const ProductFilters = ({ 
  category, 
  setCategory, 
  certification, 
  setCertification 
}: ProductFiltersProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {/* Category Filter */}
      <div className="w-full">
        <Select value={category || undefined} onValueChange={setCategory}>
          <SelectTrigger className="w-full bg-background/50 border-muted-foreground/20 focus:border-primary/50 hover:border-muted-foreground/30 transition-all duration-200">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="All Categories" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat} className="cursor-pointer">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Certification Filter */}
      <div className="w-full">
        <Select value={certification || undefined} onValueChange={setCertification}>
          <SelectTrigger className="w-full bg-background/50 border-muted-foreground/20 focus:border-primary/50 hover:border-muted-foreground/30 transition-all duration-200">
            <SelectValue placeholder="All Certifications" />
          </SelectTrigger>
          <SelectContent>
            {certifications.map((cert) => (
              <SelectItem key={cert.value} value={cert.value} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${cert.color}`} />
                  {cert.value}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}