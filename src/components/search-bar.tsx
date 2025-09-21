"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface SearchBarProps {
  search: string
  setSearch: (value: string) => void
}

export const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-10 w-full bg-background/50 border-muted-foreground/20 focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
        />
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 hover:bg-muted/50"
            onClick={() => setSearch("")}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </div>
  )
}