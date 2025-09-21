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
          productName={p.name}
          category={p.category}
          certification={p.certification}
          transparencyScore={p.transparencyScore}
          riskFlags={p.riskFlags}
          status={p.status}
          updatedDate={p.updatedDate}
          scoreColor={p.transparencyScore > 85 ? "text-green-600" : p.transparencyScore > 70 ? "text-yellow-500" : "text-red-600"}
        />
      ))}
    </div>
  )
}
