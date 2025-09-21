"use client"
import { ProductCard } from '@/components/prod-Card-Wrapper'
import { Product } from '@/data/product'

interface ProductGridProps {
  products: Product[]
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
        />
      ))}
    </div>
  )
}
