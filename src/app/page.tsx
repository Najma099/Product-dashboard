"use client"
import { useState, useMemo } from "react"
import { products as allProducts } from '@/data/product'
import { FilterBar } from '@/components/filterbar'
import { ProductGrid } from '@/components/product-Grid'
import { SummaryCard } from '@/components/summary-Card'
import { Header } from '@/components/header'

export default function Dashboard() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [certification, setCertification] = useState("")

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      return (
        (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
        (!category || p.category === category) &&
        (!certification || p.certification === certification)
      )
    })
  }, [search, category, certification])

  return (
    <div className="container mx-auto py-6">
      < Header/>
      <SummaryCard />
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        certification={certification}
        setCertification={setCertification}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  )
}
