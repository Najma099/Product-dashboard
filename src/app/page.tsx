"use client"

import { useState, useMemo } from "react"
import { products as allProducts } from '@/data/product'
import { FilterBar } from '@/components/filterbar'
import { ProductGrid } from '@/components/product-Grid'
import { SummaryCard } from '@/components/summary-Card'
import { Header } from '@/components/header'
import { ProductFormWizard } from '@/components/productFormWizard' // import your form

export default function Dashboard() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [certification, setCertification] = useState("")

  const [showForm, setShowForm] = useState(false) // state to toggle form

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
      <Header/>

      <div className='space-x-290'>
        <span>Welcome dear user...</span>
        <span>
          <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Product
        </button>
        </span>
      </div>

      <div className="flex justify-between items-center mb-4">
        <SummaryCard />
      </div>

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        certification={certification}
        setCertification={setCertification}
      />
      <ProductGrid products={filteredProducts} />

      {showForm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div className="min-h-full flex justify-center items-start py-8 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            >
              &times;
            </button>
            <ProductFormWizard />
          </div>
        </div>
      </div>
    )}
    </div>
  )
}
