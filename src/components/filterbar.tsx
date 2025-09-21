"use client"

import { SearchBar } from './search-bar'
import { ProductFilters } from './product-Filter'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, RefreshCcw, X } from "lucide-react"

interface FilterBarProps {
  search: string
  setSearch: (value: string) => void
  category: string
  setCategory: (value: string) => void
  certification: string
  setCertification: (value: string) => void
}

export const FilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  certification,
  setCertification
}: FilterBarProps) => {
  const hasFilters = search || category || certification
  const activeFilterCount = [search, category, certification].filter(Boolean).length

  const clearAllFilters = () => {
    setSearch("")
    setCategory("")
    setCertification("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20">
              {activeFilterCount} active
            </Badge>
          )}
        </div>
        
        {hasFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="self-start sm:self-auto border-muted-foreground/20 hover:border-destructive/50 hover:text-destructive transition-colors"
          >
            <RefreshCcw className="h-3 w-3 mr-2" />
            Clear all filters
          </Button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div className="flex-1">
          <ProductFilters
            category={category}
            setCategory={setCategory}
            certification={certification}
            setCertification={setCertification}
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border/50">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          
          {search && (
            <Badge variant="outline" className="gap-1 pr-1">
              <span className="truncate max-w-[100px]">"{search}"</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 hover:bg-destructive/10 hover:text-destructive ml-1 rounded-full"
                onClick={() => setSearch("")}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
          
          {category && (
            <Badge variant="outline" className="gap-1 pr-1">
              <span className="truncate max-w-[120px]">{category}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 hover:bg-destructive/10 hover:text-destructive ml-1 rounded-full"
                onClick={() => setCategory("")}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
          
          {certification && (
            <Badge variant="outline" className="gap-1 pr-1">
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${getCertificationColor(certification)}`} />
                <span className="truncate max-w-[80px]">{certification}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 hover:bg-destructive/10 hover:text-destructive ml-1 rounded-full"
                onClick={() => setCertification("")}
              >
                <X className="h-2 w-2" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}

function getCertificationColor(certification: string) {
  switch (certification) {
    case "Gold":
      return "bg-yellow-500"
    case "Platinum":
      return "bg-gray-400"
    case "Silver":
      return "bg-gray-300"
    case "Green":
      return "bg-green-500"
    case "None":
      return "bg-gray-200 dark:bg-gray-600"
    default:
      return "bg-gray-200 dark:bg-gray-600"
  }
}