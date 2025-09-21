"use client"

import { ProductCard } from '@/components/prod-Card-Wrapper'
import { Product } from '@/data/product'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Package, 
  Grid3X3, 
  List,
  SortAsc,
  SortDesc,
  Filter
} from 'lucide-react'
import { useState } from 'react'

interface ProductGridProps {
  products: Product[]
}

type ViewMode = 'grid' | 'list'
type SortOption = 'name' | 'score' | 'date' | 'category'

export const ProductGrid = ({ products }: ProductGridProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [sortBy, setSortBy] = useState<SortOption>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const sortedProducts = [...products].sort((a, b) => {
    let comparison = 0
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'score':
        comparison = (a.transparencyScore || 0) - (b.transparencyScore || 0)
        break
      case 'date':
        comparison = new Date(a.updatedDate || '').getTime() - new Date(b.updatedDate || '').getTime()
        break
      case 'category':
        comparison = (a.category || '').localeCompare(b.category || '')
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(option)
      setSortOrder('asc')
    }
  }

  if (products.length === 0) {
    return (
      <Card className="border-dashed border-2 border-muted-foreground/25">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">No products found</h3>
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Try adjusting your search criteria or filters to find what you're looking for.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border/50">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Products</h2>
          </div>
          <Badge variant="secondary" className="font-medium bg-primary/10 text-primary border-primary/20">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort('name')}
              className={sortBy === 'name' ? 'bg-primary/10 text-primary border-primary/30' : ''}
            >
              Name
              {sortBy === 'name' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort('score')}
              className={sortBy === 'score' ? 'bg-primary/10 text-primary border-primary/30' : ''}
            >
              Score
              {sortBy === 'score' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSort('date')}
              className={sortBy === 'date' ? 'bg-primary/10 text-primary border-primary/30' : ''}
            >
              Date
              {sortBy === 'date' && (
                sortOrder === 'asc' ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
              )}
            </Button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border rounded-lg p-1 bg-background/50">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 px-2"
            >
              <Grid3X3 className="h-3 w-3" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-2"
            >
              <List className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "space-y-4"
      }>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Load More / Pagination could go here */}
      {products.length > 0 && (
        <div className="flex justify-center pt-6">
          <p className="text-sm text-muted-foreground">
            Showing {products.length} products
          </p>
        </div>
      )}
    </div>
  )
}